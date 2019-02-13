var currentIndex = 0
var audio = new Audio()

audio.autoplay = true


getMusic(function(songList){
  musicList = songList
  loadMusic(songList[currentIndex])
})


function getMusic(callback){
  var xhr = new XMLHttpRequest()
  xhr.open('GET','./music.json')
  xhr.onload = function(){
    if(xhr.status>=200&&xhr.status<300||xhr.status===304){
      callback(JSON.parse(this.responseText))
    }else{
      console.log('数据失败');
    }
  }
  xhr.onerror = function(){
    console.log('error');
  }
  xhr.send()
}

function loadMusic(song){

  $('.musicbox .title').text(song.title)

  $('.musicbox .author').text(song.author)

  audio.src = song.src
  
  settotalTime()

}

function setProgressAndPresenttime(){
    audio.ontimeupdate = function(){
  }
}

audio.onplay = function(){
  clock = setInterval(()=>{
    $('.progress-now')[0].style.width = (audio.currentTime/audio.duration)*100+'%'
    var min = Math.floor(audio.currentTime/60)
    var sec = Math.floor(audio.currentTime)%60 + ''
    sec = sec.length === 2 ? sec:'0'+sec
    $('.presentTime').text(min+":"+sec)
  },1000)
}

audio.onpause = ()=>{
  clearInterval(clock)
}

function settotalTime(){
  $(audio).on("canplay",function(){
    tl=$(audio).get(0).duration;
    min = Math.floor(tl/60)
    sec = Math.floor(tl%60) + ''
    sec = sec.length === 2 ? sec:'0'+sec
    $('.totalTime').text(min+":"+sec)

  })
}

$('.play')[0].onclick = ()=>{
  if(audio.paused){
    audio.play()
    $('.play').find('.iconfont').removeClass('icon-bofang').addClass('icon-pause')


  }else{
    audio.pause()
    $('.play').find('.iconfont').removeClass('icon-pause').addClass('icon-bofang')
   }
}

$('.foward').on('click',()=>{
  currentIndex = (++currentIndex)%musicList.length
  loadMusic(musicList[currentIndex])
})

$('.back').on('click',()=>{
  currentIndex = (musicList.length+(--currentIndex))%musicList.length
  console.log(currentIndex);
  loadMusic(musicList[currentIndex])
})

$('.bar').on('click',function(e){
  var percent = e.offsetX / parseInt(getComputedStyle(this).width)
  audio.currentTime = audio.duration * percent
})

audio.onended=()=>{
  console.log(1111111);
  currentIndex = (++currentIndex)%musicList.length
  loadMusic(musicList[currentIndex])
}
