import { db } from "~/plugins/firebase.js";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  GeoPoint,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export const actions = {
  async createShop(_, shopObj) {
    const ref = doc(db, "testCollection", "testDoc2");
    const document = {
      text: "hogehoge",
    };
    try {
      await setDoc(ref, document);
      alert("Success!");
    } catch (e) {
      alert("Error!");
      console.error(e);
    }
    // const shopRef = doc(db, "shops", shopObj.id);
    // const commentsRef = collection(shopRef, "comments")

    // console.log(shopObj);
    // const shopDoc = {
    //   name: shopObj.name,
    //   address: shopObj.address,
    //   budget: shopObj.budget || 0,
    //   phone: shopObj.phone,
    //   position: new GeoPoint(shopObj.position.lat(), shopObj.position.lng()),
    //   open: shopObj.open,
    //   website: shopObj.website,
    //   tags: shopObj.tags,
    //   createdAt: serverTimestamp()
    // };

    // const commentDoc = {
    //   comment: shopObj.comment,
    // };

    // try {
    //   const status = await setDoc(shopRef, shopDoc);
    //   console.log(status)
    //   await addDoc(commentsRef, commentDoc);
    // } catch (error) {
    //   console.log(error);
    // }
  },

  async getShop(_) {
    const shopRef = doc(db, "testCollection", "testDoc");
    const shopRef2 = doc(db, "testCollection", "testDoc2");
    const docSnap = await getDoc(shopRef);
    const docSnap2 = await getDoc(shopRef2);
    console.log(docSnap.data());
    console.log(docSnap2.data());
  },
};
