let timer = null;
const MAX = 3;
let count = 0;
let eTime = 0;

const APPLICATION_KEY = "9f333617f2da87ba720e604a2cdb1da68db43f17f35ba9e9986f94ac8ee5c497";
const CLIENT_KEY = "72ad628ca386050c77d3fd0a610acd93605d3dd76a26e1762e750b3f6f510721";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "Game";
let TestClass = ncmb.DataStore(DBName);

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum = Math.floor(Math.random()*q.length);
  for(let i = 0; i < size*size; i++) {
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num" +i);
    s.addEventListener("click", function(){
      if(this.textContent == q[qNum][1]) {
        // alert("正解");
        correct.play();
        while(cells.firstChild) {
          cells.removeChild(cells.firstChild);
        }
        count++;
        if(count == MAX) {
          let score = timer-1;
          // console.log(timer-1);
          alert("Game clear!");
          let test = new TestClass();
          let key = "score"
          //const text = document.getElementById("score");
          let value = eTime;
          test.set(key, parseInt(eTime));
            test.save()
            .then(function(){
              console.log("clear");
              console.log(eTime);
            })
            .catch(function(err){
              console.log("err: " + err);
            });

            TestClass
            .order("score")
            .fetchAll()
              .then(function(results){
                // for(let i=0; i<results.length; i++) {
                //   console.log(results[0].score);

                  if(eTime < results[0].score) {
                    alert("High Score: " + eTime);
                  }
                //}
              })
              .catch(function(err){
                console.log("エラー: " + err);
              });

          cells.remove(cells);
          clearTimeout(timer);
        // gameStart();
      }
      gameStart();
    }
      else {
        wrong.play();
      }
    });
    cells.appendChild(s);
    if(i % size == size - 1) {
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }

  if(count == MAX) {
  //   let score = timer-1;
  //   console.log(timer-1);
  //   alert("Game clear!");
  //   let test = new TestClass();
  //   let key = "score"
  //   const text = document.getElementById("score");
  //   let value = score.textContent;
  //   test.set(key, parseInt(value));
  //   test.save()
  //     .then(function(){
  //       console.log("clear");
  //       console.log(value);
  //     })
  //     .catch(function(err){
  //       console.log("err: " + err);
  //     });


    // alert("タイム"+(timer-1)+"秒");
    // document.write("あなたのスコアは"+(timer-1)+"秒");
   } else {
  let r = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num" +r);
  ans.textContent = q[qNum][1];
  }
}


function time() {
  let now = new Date();
  eTime = parseInt((now.getTime() - start.getTime())/1000);
  timer = setTimeout("time()", 1000);
  score.textContent = eTime;
}
