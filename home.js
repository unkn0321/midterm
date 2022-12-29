$(document).ready(function () {
    $(".menu").slideUp(500);
    $(".nav_menu").click(function () {
        $(".menu").slideToggle(500);
    });
    let $title = $('#title');
    firebase.initializeApp({
        apiKey: "AIzaSyA5PNaIy5njCpYuuv9DvVUisnGQOYY68Dc",
        authDomain: "artist-96076.firebaseapp.com",
        databaseURL:"http://artist-96076.firebaseio.com",
        projectId: "artist-96076",
        storageBucket: "artist-96076.appspot.com",
        messagingSenderId: "518127077873",
        appId: "1:518127077873:web:2b52fb6a3797765b8ddc50",
        measurementId: "G-Q9H7LF04T3"
    });
    let chatroomDocRef = firebase.firestore()
        .collection("chatrooms")
        .doc("chatroom1");
    let messagesCollectionRef=chatroomDocRef.collection("messages");
    const $messageField = $('#message-field');
    const $nameField = $('#name-field');
    const $messageList = $('#message-list');
    $messageField.keypress(function (e) {
        if (e.keyCode == 13) {

            let senderName = $nameField.val();
            let message = $messageField.val();

            messagesCollectionRef.add({
                senderName: senderName,
                message: message,
                timeStamp: Date.now(),
            });
            $messageField.val('');
        }
    });
    
    let queryMessagesCollectionRef = messagesCollectionRef.orderBy("timeStamp","asc");
    queryMessagesCollectionRef.onSnapshot(function(querySnapshot){
        $messageList.html("");

        querySnapshot.forEach(function(doc){
            let senderName = doc.data().senderName || "anonymous";
            let message = doc.data().message;
            let messageItem = `
            <li class="message-item">
            <strong class="chat-username">${senderName}:</strong>
            ${message}
            </li>
            `;
            $messageList.append(messageItem);
        });
        $messageList[0].scrollTop = $messageList[0].scrollHeight;
    });
});
