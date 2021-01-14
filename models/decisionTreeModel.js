import { types, onSnapshot, flow } from "mobx-state-tree";
import {
  find,
  propEq,
  clone,
  lensPath,
  set,
  hasPath,
  path,
  findIndex,
  contains,
} from "ramda";
import * as d3 from "d3";
import { DescisionTreeNode } from "./decisionTreeNode";
import auth from "../utils/auth";

export const DescisionTreeModel = types
  .model("DescisionTreeModel", {
    updated: `${new Date().getTime()}`,
    name: types.string,
    savedJson: types.frozen(),
    currentNode: types.maybeNull(types.string),
    allNodes: types.array(DescisionTreeNode),
    consumerKey: types.maybe(types.string),
    userId: types.maybe(types.string),
    twitterHandle: types.maybeNull(types.string),
    identityId: types.maybe(types.string),
    startNode: types.maybeNull(types.string),
    copyNode: types.maybeNull(types.string),
    _id: types.maybeNull(types.string),
    totalNodes: types.maybeNull(types.number),
    totalLeaves: types.maybeNull(types.number),
    shared: types.maybeNull(types.boolean, false),
  })
  .actions(self => {
    return {
      updatedSavedJson: json => {
        self.savedJson = json;
      },
      setCopyNode: id => {
        self.copyNode = id;
      },
      updateUpdated: () => {
        self.updated = `${new Date().getTime()}`;
      },
      setApp: consumerKey => {
        self.consumerKey = consumerKey;
      },
      setUser: userId => {
        self.userId = userId;
      },
      addStartNode: data => {
        const startNodeId = `${Math.round(Math.random() * 10000000000)}`;
        self.allNodes.push(
          DescisionTreeNode.create({
            ...data,
            id: startNodeId,
            startNode: startNodeId,
          })
        );
      },
      addOptions: ({ data, identity }) => {
        console.log({ data, identity });
        const newNodes = [];
        const currentNode = self.getNodeById(self.currentNode);
        let lastParent;
        let nextChild = `${Math.round(Math.random() * 10000000000)}`;
        data.forEach(({ prompt, response }, idx) => {
          const forkId = `${Math.round(Math.random() * 10000000000)}`;
          const replyId = `${nextChild}`;
          nextChild = `${Math.round(Math.random() * 10000000000)}`;
          if (idx === 0) {
            currentNode.addChildId(replyId);
          }
          newNodes.push({
            id: forkId,
            text: response,
          });
          newNodes.push({
            id: replyId,
            forkNode: forkId,
            text: prompt,
            childNode: idx !== data.length - 1 ? nextChild : null,
            parentNode: idx === 0 ? self.currentNode : lastParent,
          });

          lastParent = replyId;
        });
        newNodes.forEach(obj => {
          self.allNodes.push(DescisionTreeNode.create(obj));
        });
        identity && self.saveTree({ identity });
      },
      addChildCopy: ({ parentNode }) => {
        const copyParent = self.getNodeById(self.copyNode);

        const copies = [];
        const originals = [];
        const randomiser = Math.random() * 10000000;
        let childId = null;
        const forks = [];
        const iterateNodes = ({
          node: { childNode, forkNode, parentNode, id, text },
          node,
          first,
        }) => {
          originals.push(node);
          if (first) {
            childId = `${Math.round(parseInt(id, 10) + randomiser)}`;
            forks.push(childId);
          }
          const copy = {
            ...node,
            clonedForkNode: null,
            childNode: childNode
              ? `${Math.round(parseInt(childNode, 10) + randomiser)}`
              : childNode,
            parentNode:
              parentNode && !first
                ? `${Math.round(parseInt(parentNode, 10) + randomiser)}`
                : parentNode,
            forkNode: contains(
              `${Math.round(parseInt(forkNode, 10) + randomiser)}`,
              forks
            )
              ? null
              : forkNode
              ? `${Math.round(parseInt(forkNode, 10) + randomiser)}`
              : forkNode,
            id: first
              ? childId
              : `${Math.round(parseInt(id, 10) + randomiser)}`,
            text,
          };
          copies.push(copy);
          if (
            !contains(
              `${Math.round(parseInt(forkNode, 10) + randomiser)}`,
              forks
            ) &&
            forkNode &&
            self.getNodeById(forkNode)
          ) {
            forks.push(`${Math.round(parseInt(forkNode, 10) + randomiser)}`);
            iterateNodes({
              node: self.getNodeById(forkNode),
            });
          }
          if (childNode && self.getNodeById(childNode)) {
            iterateNodes({
              node: self.getNodeById(childNode),
            });
          }
        };
        iterateNodes({ node: { ...copyParent, parentNode }, first: true });
        copies.forEach(copy => self.allNodes.push(copy));
        self.copyNode = null;
        return childId;
      },
      addSiblingCopy: ({ parentNode }) => {
        const current = self.getNodeById(parentNode);
        current.addForkId(self.copyNode);
        self.copyNode = null;
      },
      deDupe: flow(function* deDupe({ identity }) {
        const findUndupe = ({ text, threadStarters }) => {
          const newText = text + " ";
          if (!contains(newText, threadStarters)) {
            return newText;
          }
          return findUndupe({ text: newText, threadStarters });
        };
        const start = self.allNodes[0];
        const threadStarters = [];
        const theadStarterIds = [];
        const iterateNodes = ({
          node: { childNode, forkNode, parentNode, id, text, sibling },
          node,
          first,
        }) => {
          let textToUse = text;
          if (contains(id, theadStarterIds)) {
            return;
          }
          theadStarterIds.push(id);
          const isDupe = contains(text, threadStarters);

          if (!parentNode) {
            if (isDupe) {
              textToUse = findUndupe({ text, threadStarters });

              node.updateText(textToUse);
            }
            threadStarters.push(textToUse);
          }
          if (forkNode && self.getNodeById(forkNode)) {
            iterateNodes({
              node: self.getNodeById(forkNode),
            });
          }
          if (childNode && self.getNodeById(childNode)) {
            iterateNodes({
              node: self.getNodeById(childNode),
            });
          }
        };
        iterateNodes({ node: start, first: true });
        self.saveTree({ identity });
      }),
      updateStartNode: ({ startId, identity }) => {
        self.startNode = startId;
        identity && self.saveTree({ identity });
      },
      updateName: name => {
        self.name = name;
      },
      setCurrentNode: id => {
        self.currentNode = id;
      },
      setShared: shared => {
        console.log({ shared });
        self.shared = shared;
        console.log(self.shared);
      },
      deleteNode: ({ id, identity }) => {
        const forkParent = find(propEq("forkNode", id), self.allNodes);
        const parent = find(propEq("childNode", id), self.allNodes);
        const child = find(propEq("parentNode", id), self.allNodes);
        console.log({ parent, child });
        if (parent && child) {
          parent.updateChildId(child.id);
          child.updateParentId(parent.id);
        } else if (parent) {
          parent.updateChildId(null);
        }

        if (forkParent) {
          forkParent.updateForkId(null);
        }

        // const siblingIndex = findIndex(propEq("forkNode", id), self.allNodes);
        // const parentIndex = findIndex(propEq("childNode", id), self.allNodes);
        const nodeIndex = findIndex(propEq("id", id), self.allNodes);

        self.allNodes.splice(nodeIndex, 1);
        const all = clone(self.allNodes.toJSON());

        self.allNodes = [];
        self.allNodes = all;

        self.currentNode = null;
        self.currentNode = all[0].id;

        self.saveTree({ identity });

        //self.updateUpdated()
      },
      saveNode: flow(function* saveNode({ node, identity }) {
        self.allNodes.push(node);
        self.saveTree({ identity });
      }),
      exportJson: flow(function* exportJson({ identity }) {
        console.log(self.toJSON());
        const { name, allNodes, startNode } = self.toJSON();
        const parseNodes = async nodes => {
          return Promise.all(
            nodes.map(
              async ({
                tweetId,
                mediaId,
                mediaUrl,
                mediaType,
                forkNode,
                linkToStart,
                error,
                clonedForkNode,
                isVideo,
                text,
                ...rest
              }) => {
                // console.log({
                //   tweetId,
                //   text,
                //   mediaId,
                //   forkNode,
                //   linkToStart,
                //   error,
                //   clonedForkNode,
                //   isVideo,
                //   ...rest,
                // });
                console.log({
                  mediaType,
                });
                const linkRegex = /(?:(?:ftp|file|card):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi;
                const links = text.match(linkRegex);
                const parsedText = text.replace(linkRegex, "");
                if (mediaType === "animated_gif") {
                  console.log("animated_gif");
                  const headers = await auth.generateHeaders(identity);
                  const result = await fetch(
                    "/.netlify/functions/cloudinary-uploadvid",
                    {
                      method: "POST",
                      headers,
                      body: JSON.stringify({
                        videoUrl: mediaUrl,
                      }),
                    }
                  ).then(response => {
                    return response.json();
                  });
                  console.log({ result });
                  const { secure_url } = result;
                  const gif_url = secure_url.replace(".mp4", ".gif");
                  return {
                    forkNode: linkToStart ? startNode : forkNode,
                    mediaUrl: gif_url,
                    carduri: links ? links[0] : null,
                    text: parsedText.replace(/[\""]/g, '\\"'),
                    ...rest,
                  };
                } else {
                  return {
                    forkNode: linkToStart ? startNode : forkNode,
                    text: parsedText.replace(/[\""]/g, '\\"'),
                    carduri: links ? links[0] : null,
                    mediaUrl,
                    ...rest,
                  };
                }
              }
            )
          );
        };
        const parsedAllNodes = yield parseNodes(allNodes);
        console.log({ parsedAllNodes });
        return {
          name,
          startNode: parsedAllNodes[0].id,
          allNodes: parsedAllNodes,
        };
      }),
      saveTree: flow(function* saveTree({ identity }) {
        const allNodes = self.allNodes.toJSON();
        const {
          name,
          consumerKey,
          updated,
          userId,
          twitterHandle,
          identityId,
          startNode,
          shared = false,
        } = self.toJSON();

        const headers = yield auth.generateHeaders(identity);

        //copy(encodeURIComponent(JSON.stringify(allNodes)));
        if (self._id) {
          const response = yield fetch("/.netlify/functions/fauna-saveTree", {
            method: "POST",
            headers,
            body: JSON.stringify({
              allNodes: encodeURIComponent(JSON.stringify(allNodes)),
              treeId: self._id,
              name,
              consumerKey,
              updated,
              userId,
              twitterHandle,
              identityId,
              startNode,
              shared,
            }),
          }).then(response => {
            return response.json();
          });
          const getUpdated = path(["results", "data", "updateTrees"]);
          const updatedResults = getUpdated(response);
        } else {
          const response = yield fetch(
            "/.netlify/functions/fauna-saveNewTree",
            {
              method: "POST",
              headers,
              body: JSON.stringify({
                allNodes: encodeURIComponent(JSON.stringify(allNodes)),
                treeId: self._id,
                name,
                consumerKey,
                updated,
                userId,
                twitterHandle,
                identityId,
                shared,
              }),
            }
          ).then(response => {
            return response.json();
          });
          const getUpdated = path(["results", "data", "createTrees"]);
          const updatedResults = getUpdated(response);

          self._id = updatedResults._id;
        }
      }),
      updateTotals: (nodes, leaves) => {
        self.totalNodes = nodes;
        self.totalLeaves = leaves;
      },
    };
  })
  .views(self => {
    return {
      getNodeById: id => {
        return find(propEq("id", id), self.allNodes);
      },
      getSentTweets: id => {
        return self.allNodes.filter(({ tweetId }) => !!tweetId).length;
      },
      getTreeJson: ({ clean } = { clean: true }) => {
        let updatedJson = {};
        const forks = [];
        const replies = [];
        const iterateNodes = ({
          node: { childNode, forkNode, id, text },
          jsonObj,
          pathArr,
        }) => {
          if (
            forkNode &&
            self.getNodeById(forkNode) &&
            !contains(forkNode, forks) &&
            !contains(forkNode, replies)
          ) {
            forks.push(forkNode);
            const clonePushArr = clone(pathArr);
            clonePushArr.push("fork");
            const nodePath = lensPath(clonePushArr);
            const forkNodeJson = self.getNodeById(forkNode).toJSON();
            const jsonToUse = clean
              ? {
                  text: forkNodeJson.text,
                }
              : { ...forkNodeJson, clonePushArr };
            updatedJson = set(nodePath, jsonToUse, updatedJson);
            iterateNodes({
              node: self.getNodeById(forkNode),
              pathArr: clonePushArr,
            });
          } else if (
            (forkNode &&
              self.getNodeById(forkNode) &&
              contains(forkNode, forks)) ||
            contains(forkNode, replies)
          ) {
            const thisNode = self.getNodeById(id);
            thisNode.setClonedForkNode(forkNode);
          }
          if (childNode && self.getNodeById(childNode)) {
            replies.push(childNode);
            const clonePushArr = clone(pathArr);
            clonePushArr.push("child");
            const nodePath = lensPath(clonePushArr);
            const childNodeJson = self.getNodeById(childNode).toJSON();
            const jsonToUse = clean
              ? {
                  text: childNodeJson.text,
                }
              : { ...childNodeJson, clonePushArr };
            updatedJson = set(nodePath, jsonToUse, updatedJson);

            iterateNodes({
              node: self.getNodeById(childNode),
              pathArr: clonePushArr,
            });
          }
        };

        const parentNode = self.allNodes[0];
        if (!parentNode) {
          return {};
        }
        const jsonObj = { ...parentNode.toJSON() };
        updatedJson = { ...parentNode.toJSON() };
        iterateNodes({ node: parentNode, jsonObj, pathArr: [] });
        return updatedJson;
      },

      getAllConnectedNodes: () => {
        const root = d3.hierarchy(
          self.getTreeJson(self.allNodes.toJSON()),
          ({ fork, child }) => {
            if (fork && !child) {
              return [fork];
            }
            if (!fork && child) {
              return [child];
            }
            if (fork && child) {
              return [child, fork];
            }
            return undefined;
          }
        );

        const nodes = root.descendants();
        const leaves = root.leaves();
        self.updateTotals(nodes.length, leaves.length);

        return nodes.map(({ data: { id, tweetId } }) => ({
          id,
          tweetId,
        }));
      },
    };
  });
