var ref, fbObj, hsText = [];
demo.state9 = function () {};
demo.state9.prototype = {
    preload: function () {
        game.load.image('button1', 'assets/sprites/button1.png');
        game.load.image('button2', 'assets/sprites/button2.png');
    }, 
    create: function () {
        game.stage.backgroundColor = '#ffcc66';
        addChangeStateEventListeners();
        var config = {
            apiKey: "key_goes_here",
            authDomain: "auth_domain_goes_here",
            databaseURL: "database_url_goes_here",
            storageBucket: "storage_bucket_goes_here",
            messagingSenderId: "sender_id_goes_here"
        };
        firebase.initializeApp(config);
        firebase.auth().signInWithEmailAndPassword('mail', 'pass').catch(function(error) {
            if(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('error!');
            } else{
                console.log('logged in.');
            }
        });       
        ref = firebase.database().ref();
        
        for (var i = 1; i < 11; i++) {
            game.add.text(500, 20 + (i * 90), i + '. ', {
                fontSize: '40px'
            }).anchor.setTo(1, 0);
        }
        for (var i = 0; i < 10; i++) {
            hsText[i] = game.add.text(500, 20 + ((i + 1) * 90), '', {
                fontSize: '40px'
            });
        }
        var updateHSText = this.updateHSText;
        ref.on('value', function(snapshot){
            fbObj = snapshot.val();
            updateHSText(fbObj.hs);
        });
        
        game.add.button(800, 400, 'button1', function(){
            var score = Math.round(Math.random() * 100);
            fbObj.hs.push(score);
            fbObj.hs = fbObj.hs.sort(function(a,b){
                return b-a;
            }).slice(0, 10);
            ref.set(fbObj);
        });
        
        game.add.button(800, 600, 'button2', function(){
            ref.set({hs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]});
        });
    },
    update: function () {},
    updateHSText: function(hs){
        for (var i = 0; i < 10; i++) {
            hsText[i].text = hs[i];
        }
    }
};