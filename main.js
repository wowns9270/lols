const items = document.querySelector('.items');
const btn = document.querySelector('.check');
const nick = document.querySelector('.search-bar');
let id ='';
let acount_id ='';

function gogo3(){
    fetch(`
    https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${acount_id}?api_key=${API_KEY}
    `).then((res) => {
        if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
            res.text().then(

                text => {

                    let info2 = JSON.parse(text);
                   
                    const para = document.querySelector('.items');
                    
                    for(let i = 0 ; i<2; i++){

                        if (info2[i].queueType === 'RANKED_SOLO_5x5'){
                            para.innerHTML = `
                                <div class ='good_id'> 
                                ${info2[i].summonerName}
                                </div>
                                <div class ='comment_id'> 
                                티어는 ${info2[i].tier} ${info2[i].rank} 입니다.
                                </div>
                                <br>
                                <div class ='score_id'>
                                점수는 ${info2[i].leaguePoints}점 입니다.
                                </div>
                                `;            
                        }

                    }
                }

            );
        } else {
            console.error(res.statusText);
        }
    }).catch(err => console.error(err));
}



function gogo2(){
    fetch(`
    https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${id}?api_key=${API_KEY}
    `).then((res) => {
    if (res.status === 200 || res.status === 201) { // 성공을 알리는 HTTP 상태 코드면
        res.text().then(
            
            text => {
                
                let info = JSON.parse(text);
                acount_id = info.id;

                gogo3();
                
            }
        
        
        );      
    } else if(res.staus == 404){
        console.log("없다");
    }
    }).catch(err => console.error(err));

}



btn.addEventListener('click', function(){

    if(nick.value){
        id = nick.value;
        gogo2();
    }
    
})

    
nick.addEventListener('keyup', (e) => {
    
    if (e.keyCode === 13) {
        
        if (nick.value) {
            id = nick.value;
            gogo2();
        }
    }
});
