// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA_E47N-z7CF9JkxL4Ew35Ia0q4fk7NO24",
  authDomain: "qlct-99300.firebaseapp.com",
  databaseURL: "https://qlct-99300-default-rtdb.firebaseio.com",
  projectId: "qlct-99300",
  storageBucket: "qlct-99300.appspot.com", // sửa "firebasestorage.app" thành "appspot.com"
  messagingSenderId: "985355269832",
  appId: "1:985355269832:web:7bdfded6927dfb540597fd",
  measurementId: "G-7D5JVTL3KR"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo các dịch vụ Firebase
const db = getFirestore(app);
const auth = getAuth(app);

// Xuất ra để sử dụng ở nơi khác
export { app, db, auth };
