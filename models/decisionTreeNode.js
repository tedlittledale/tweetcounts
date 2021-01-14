import { types, onSnapshot, flow } from "mobx-state-tree";
import { propEq, find } from "ramda";

export const DescisionTreeNode = types
  .model("DescisionTreeModel", {
    id: types.identifier,
    text: types.string,
    mediaId: types.maybe(types.string),
    mediaUrl: types.maybe(types.string),
    childNode: types.maybeNull(types.string),
    parentNode: types.maybe(types.string),
    forkNode: types.maybeNull(types.string),
    clonedForkNode: types.maybeNull(types.string),
    isVideo: types.maybeNull(types.boolean),
    mediaType: types.maybeNull(types.string),
    tweetId: types.maybeNull(types.string),
    linkurl: types.maybeNull(types.string),
    error: types.maybeNull(types.string),
    linkToStart: false,
  })
  .actions(self => {
    return {
      updateNode: ({
        text,
        mediaId,
        mediaUrl,
        isVideo,
        linkurl,
        linkToStart = false,
      }) => {
        self.text = text;
        if (mediaId) {
          self.mediaId = mediaId;
        }
        if (mediaUrl) {
          self.mediaUrl = mediaUrl;
        }
        if (linkurl) {
          self.linkurl = linkurl;
        } else {
          self.linkurl = null;
        }
        self.isVideo = isVideo;

        self.linkToStart = linkToStart;
      },
      updateText: text => {
        self.text = text;
      },
      setClonedForkNode: id => {
        self.clonedForkNode = id;
      },
      insertChildNode: data => {
        const oldChildId = self.childNode;
        const childNode = DescisionTreeNode.create({
          ...data,
          parentNode: self.id,
          childNode: oldChildId,
          id: `${Math.round(Math.random() * 10000000000)}`,
        });
        self.childNode = childNode.id;
        return { childNode, oldChildId };
      },
      addChildNode: data => {
        const childNode = DescisionTreeNode.create({
          ...data,
          parentNode: self.id,
          id: `${Math.round(Math.random() * 10000000000)}`,
        });
        self.childNode = childNode.id;
        return childNode;
      },
      addChildId: id => {
        self.childNode = id;
      },
      updateChildId: id => {
        self.childNode = id;
      },
      updateForkId: id => {
        self.forkNode = id;
      },
      updateParentId: id => {
        self.parentNode = id;
      },
      addForkNode: data => {
        const forkNode = DescisionTreeNode.create({
          ...data,
          id: `${Math.round(Math.random() * 10000000000)}`,
        });
        self.forkNode = forkNode.id;
        return forkNode;
      },
      addForkId: id => {
        self.forkNode = id;
      },
      saveTweet: ({ tweetId }) => {
        self.tweetId = tweetId;
        self.error = "";
        delete self.error;
      },
      deleteTweet: () => {
        self.tweetId = null;
        console.log(self.toJSON());
      },
      setError: ({ message }) => {
        self.error = message;
      },
    };
  })
  .views(self => {
    return {
      isTweetable: ({ currentTree, startTweet }) => {
        if (!!self.linkToStart && !startTweet) {
          return false;
        }
        if (self.forkNode && self.parentNode) {
          const sibling = currentTree.getNodeById(self.forkNode);
          const parent = currentTree.getNodeById(self.parentNode);
          return parent && parent.tweetId && sibling && sibling.tweetId
            ? true
            : false;
        }
        if (self.forkNode) {
          const sibling = currentTree.getNodeById(self.forkNode);
          return sibling && sibling.tweetId ? true : false;
        }
        if (self.parentNode) {
          const parent = currentTree.getNodeById(self.parentNode);
          return parent && parent.tweetId ? true : false;
        }
        return true;
      },
      isDeletable: ({ currentTree }) => {
        if (self.forkNode || currentTree.startNode === self.id) {
          return false;
        }
        const forkParent = find(propEq("forkNode", self.id))(
          currentTree.allNodes
        );
        if (forkParent && self.childNode) {
          return false;
        }

        return true;
      },
    };
  });
