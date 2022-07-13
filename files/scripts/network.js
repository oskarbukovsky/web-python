function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

class Message {
    constructor(username, uuid, message) {
        this.username = username;
        this.uuid = uuid;
        this.message = message;
        this.timestamp = new Date().getTime();
    }
}

var nameList = [
    'Time', 'Past', 'Future', 'Dev',
    'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
    'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
    'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
    'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
    'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
    'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
    'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
    'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
    'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
    'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
    'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
    'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
    'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
    'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
    'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
    'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
    'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
    'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
    'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
    'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
];

function randName() {
    finalName = nameList[Math.floor(Math.random() * nameList.length)];
    finalName += nameList[Math.floor(Math.random() * nameList.length)];
    if (Math.random() > 0.5) {
        finalName += nameList[Math.floor(Math.random() * nameList.length)];
    } else {
        finalName += getRandomIntInclusive(1, 99);
    }
    return finalName;
};

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    //f(1,2) -> 1 or 2
}

function updateMembers() {
    $("#members-count").html("Members: " + members.length);
    $("#members-list").html("");
    members.forEach(member => { $("#members-list").append(member.clientData.username + "<br>") });
}

let uuid = uuidv4();
let username = prompt("Enter your name:") ?? randName();
let remoteUsername;
let drone = new Scaledrone('9lSwhGfWeyzdNMl5', {
    data: {
        username: username
    }
});
let room;
var members = [];
var cfg = { 'iceServers': [{ 'url': "stun:stun.gmx.net" }] };
var con = { 'optional': [{ 'DtlsSrtpKeyAgreement': true }] };
var peerConnection1 = new RTCPeerConnection(cfg, con), dataChannel1 = null, tn1 = null, activedc, peerConnection1icedone = false;
var peerConnection2 = new RTCPeerConnection(cfg, con), dataChannel2 = null, peerConnection2icedone = false;
let webRTC = {
    localOffer: "",
    remoteAnswer: "",
    remoteOffer: "",
    localAnswer: ""
}


drone.on('open', () => {
    drone.on('error', (error) => {
        console.error('Error with connection:', error);
    });
    drone.on('close', (event) => {
        console.log('Connection closed:', event);
    });

    room = drone.subscribe('observable-room', {
        historyCount: 100
    });
    room.on('open', error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Connected to room');
        }
    });

    room.on('members', memberList => {
        members = memberList;

        updateMembers();
    });

    room.on('member_join', member => {
        members.push(member);

        updateMembers();
    });

    room.on('member_leave', ({ id }) => {
        const index = members.findIndex(member => member.id === id);

        console.log("Members: " + members[index].clientData.username + " left");
        members.splice(index, 1);

        updateMembers();
    });

    room.on('message', message => {
        if (JSON.parse(message.data).uuid != uuid) {
            console.log(JSON.parse(message.data));
            if (JSON.parse(message.data).message.type == "offer") {
                webRTC.remoteOffer = JSON.stringify(JSON.parse(message.data).message);
            }

            if (JSON.parse(message.data).message.type == "answer") {
                webRTC.remoteAnswer = JSON.stringify(JSON.parse(message.data).message);
            }
        }

    });
});



// BOB: pasted Alice's answer
answerRecdBtn.onclick = function () {
    var answerDesc = new RTCSessionDescription(JSON.parse(webRTC.remoteAnswer))
    peerConnection1.setRemoteDescription(answerDesc);
};

// ALICE: pasted Bob's answer
offerRecdBtn.onclick = function () {
    var offerDesc = new RTCSessionDescription(JSON.parse(webRTC.remoteOffer))
    peerConnection2.setRemoteDescription(offerDesc)
    peerConnection2.createAnswer(function (answerDesc) {
        peerConnection2.setLocalDescription(answerDesc)
    },
        function () { },
        null)
};

function sendMessage() {
    if (messageTextBox.value) {
        //Print msg on local terminal

        activedc.send(JSON.stringify(new Message(username, uuid, messageTextBox.value)));
        chatlog.innerHTML += '[' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + '][' + username + ']: ' + messageTextBox.value + '</p>';
        messageTextBox.value = "";
    }
    return false
}

// BOB: create
createBtn.onclick = function () {
    dataChannel1 = peerConnection1.createDataChannel('test', { reliable: true })
    activedc = dataChannel1
    dataChannel1.onopen = function (e) { }
    dataChannel1.onmessage = function (e) {
        if (e.data.size) {
            fileReceiver1.receive(e.data, {})
        } else {
            //Print msg from Alice to Bob

            if (e.data.charCodeAt(0) == 2) {
                return
            }
            var data = JSON.parse(e.data)
            if (data.type === 'file') {
                fileReceiver1.receive(e.data, {})
            } else {
                console.log(data);
                chatlog.innerHTML += '[' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + '][' + data.username + ']: ' + data.message + '</p>';
                chatlog.scrollTop = chatlog.scrollHeight
            }
        }
    }
    peerConnection1.createOffer(function (desc) {
        peerConnection1.setLocalDescription(desc)
    }, function () { }, null)
};

peerConnection2.ondatachannel = function (e) {
    var datachannel = e.channel || e;
    dataChannel2 = datachannel
    activedc = dataChannel2
    dataChannel2.onopen = function (e) { }
    dataChannel2.onmessage = function (e) {
        if (e.data.size) {
            fileReceiver2.receive(e.data, {})
        } else {
            //Print msg from Bob to Alice

            var data = JSON.parse(e.data)
            if (data.type === 'file') {
                fileReceiver2.receive(e.data, {})
            } else {
                console.log(data);
                chatlog.innerHTML += '[' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + '][' + data.username + ']: ' + data.message + '</p>';
                chatlog.scrollTop = chatlog.scrollHeight;
            }
        }
    }
}

peerConnection1.onicecandidate = function (e) {
    if (e.candidate == null) {

        //Broadcast offer to room
        drone.publish({
            room: 'observable-room',
            message: JSON.stringify(new Message(username, uuid, peerConnection1.localDescription))
        });
    }
}
peerConnection2.onicecandidate = function (e) {
    if (e.candidate == null) {

        //Broadcast answer to room
        drone.publish({
            room: 'observable-room',
            message: JSON.stringify(new Message(username, uuid, peerConnection2.localDescription))
        });
    }
}