window.addEventListener('DOMContentLoaded', function(){
  
  const bell = document.querySelector('.bell');
  const leftBox = document.querySelector('.left_box');
  const rightBox = document.querySelector('.right_box');
  const feed = document.querySelector('#contents_container');
  const txt = document.querySelector('#comment37');
  leftBox.style.right = `${innerWidth * 0.5 + 430}px`
  rightBox.style.left = `${innerWidth * 0.5 + 90}px`;

  function notification() {
    this.classList.toggle('on');
  }
  function delegation(e){
    let elem = e.target;
    
    while(!elem.getAttribute('data-name')){
      elem = elem.parentNode;

      if(elem.nodeName === 'BODY'){
        elem = null;
        return;
      }
    }

    if(elem.matches('[data-name="like"]')){
      console.log("맞다")
      elem.classList.toggle('active');

      let pk = elem.getAttribute('data-name');
      $.ajax({
        type:'POST',
        url:'data/like.json',
        data:{pk},
        dataType: 'json',
        success: (res)=>{
          let likeCount = document.querySelector('#like-count-37');
          likeCount.innerHTML = res.like_count;
        },
        error:()=>{
          alert('로그인해');
          window.location.replace('https://www.naver.com');
        }
      })
    } 
    else if(elem.matches('[data-name="more"]')) {
      elem.classList.toggle('active');
    }
    else if(elem.matches('[data-name="send"]')){
      $.ajax({
        type:'POST',
        url:'data/comment.html',
        data:'',
        dataType:'html',
        success:(data)=>{
          document.querySelector('.comment_container').insertAdjacentHTML('beforeend',data)
        },
        error:()=>{
          alert('로그인해');
          window.location.replace('https://www.naver.com');
        }
      })
      txt.value = '';
    }
    else if(elem.matches('[data-name="delete"]')) {
      if(confirm('ㄹㅇ?????? ㄷㄷㄷ') === true){
        $.ajax({
          type:'POST',
          url:'data/delete.json',
          data:'',
          dataType:'json',
          success: (res)=>{
            if(res.status){
              let comt = document.querySelector('.comment37');
              comt.remove();
            }
          },
          error : ()=>{

          }
        })
      }
      else{

      }
    }
  }

  bell.addEventListener('click', notification)
  feed.addEventListener('click', delegation)
  function scrollFunc() {
    
    let dH = document.body.scrollHeight;
    let sH = pageYOffset + window.innerHeight;
    
    if(sH>=dH) {

    }
  }
  window.addEventListener('scroll', scrollFunc);

  function resizeFunc() {
    leftBox.style.right = `${innerWidth * 0.5 + 430}px`;
    rightBox.style.left = `${innerWidth * 0.5 + 90}px`;
  }
  window.addEventListener('resize', resizeFunc);
})




