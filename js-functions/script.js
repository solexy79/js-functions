// DARK MODE SCRIPT
document.querySelector('#darkMode').addEventListener('click', () => {
  document.querySelector('body').classList.toggle('change');
  document.querySelector('.analog-clock').classList.toggle('change');
  document.querySelector('#time').classList.toggle('change');
  document.querySelector('.date').classList.toggle('change');
})



// ANALOGCLOCK CONTROLLER
var analogClockController = (function(){
  setInterval(setClock, 1000)
 
 const hourHand = document.querySelector('[data-hour-hand');
 const minuteHand = document.querySelector('[data-minute-hand');
 const secondHand = document.querySelector('[data-second-hand');
 
 function setClock (){
   const currentDate = new Date()
   const secondsRatio = currentDate.getSeconds() / 60
   const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
   const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
   setRotation(secondHand, secondsRatio)
   setRotation(minuteHand, minutesRatio)
   setRotation(hourHand, hoursRatio)
 }
 
 function setRotation( element, rotationRatio){
   element.style.setProperty('--rotation', rotationRatio *360
   )
 }
 setClock()
 
 })();
 
 
 // DIGITALCLOCK CONTROLLER
 var digitalClock = (function(){
   setInterval(digitalClock, 1000);
   function digitalClock(){
   var hour = document.getElementById("hour")
   var minute = document.getElementById("minute")
   var second = document.getElementById("second")
 
   var h = new Date ().getHours();
   var m = new Date().getMinutes();
   var s = new Date().getSeconds();
 
   if(h < 10){
     hour.innerHTML = '0' + h + ':'
   }else{
     hour.innerHTML = h + ':'
   }
   if(m < 10){
     minute.innerHTML = '0' + m + ':'
   }else{
     minute.innerHTML = m  + ':'
   }
   if(s < 10){
     second.innerHTML = '0' + s 
   }else{
     second.innerHTML = s
   }
   }  
 })();


//SET DATE
 function setDate(){
  var todayDate = document.querySelector('.date')

  let day;

  switch(new Date().getDay()){
    case 0: day = 'Sun' ;
    break;
    case 1: day = 'Mon' ;
    break;
    case 2: day = 'Tue' ;
    break;
    case 3: day = 'Wed' ;
    break;
    case 4: day = 'Thu' ;
    break;
    case 5: day = 'Fri' ;
    break;
    case 6: day = 'Sat' ;
    break;
  }

  let month;
  switch(new Date().getMonth()){
    case 0: month = 'Jan' ;
    break;
    case 1: month = 'Feb' ;
    break;
    case 2: month = 'Mar' ;
    break;
    case 3: month = 'Apr' ;
    break;
    case 4: month = 'May' ;
    break;
    case 5: month = 'Jun' ;
    break;
    case 6: month = 'Jul' ;
    break;
    case 7: month = 'Aug' ;
    break;
    case 8: month = 'Sept' ;
    break;
    case 9: month = 'Oct' ;
    break;
    case 10: month = 'Nov' ;
    break;
    case 11: month = 'Dec' ;
    break;
  }


  todayDate.innerHTML = `${new Date().getDate()} ${month}, ${day} ${new Date().getFullYear()}`;
}
setDate();

// ALARM CONTROLLER
var alarmController = (function(){
  
  var Alarms = function(value){
    this.value = value;
  }
  
  var allAlarms = [];
  
  

  return{
    addAlarm: function(val){
      var newAlarm;

      newAlarm = new Alarms(val)

      allAlarms.push(newAlarm)
      return newAlarm;
    },
    testing: function(){
      var alarmSound = document.querySelector('[data-sound]')
      
      for(let i=0 ; i<allAlarms.length; i++){
        if(isNaN(allAlarms[i].value)){
            alert('Invalid Date')
            return;
          }
          var alarm  = new Date(allAlarms[i].value);
          console.log(alarm)

          var html =document.querySelector('.alarms')
    
          //Create HTML string with placeholder text
    
          html.innerHTML +=`<p class="alarm-1">You have set an alarm for ${alarm}</p>`
          
          var alarmTime = new Date (alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
          
          var diff = alarmTime.getTime() -(new Date()).getTime();
          
          // if(diff < 0){
          //   alert("its time");
          //   return;
          // }
            
            setTimeout(initAlarm, diff);
          }
          
          function initAlarm(){
            alarmSound.play()
            document.getElementById('alarmOptions').style.display = '';
          }

          document.querySelector('.stop-alarm').addEventListener('click', stopAlarm)
          
          function stopAlarm() {
            alarmSound.pause();
            alarmSound.currentTime = 0;
            document.getElementById('alarmOptions').style.display = 'none';
          }

          document.querySelector('.snooze-alarm').addEventListener('click', snooze)

          function snooze(){
            stopAlarm();
            setTimeout(initAlarm, 120000);
          }
    }
  }
})();



// USER INTERFACE CONTROLLER
var UIController = (function(){

  var DOMstrings = {
    alarmInput: '#alarmTime',
    alarmBtn: '.add-alarm'
  }

  return{
    getinput: function(){
      return{
        value: document.querySelector(DOMstrings.alarmInput).valueAsNumber
      } 
    },

    

    getDOMstrings: function(){
      return DOMstrings;
    }
  }
  
})();

//TIMER

  

  

// GLOBAL APP CONTROLLER
var controller = (function(alarmCtrl, UICtrl){

  var setupEventListeners = function(){
    var DOM = UICtrl.getDOMstrings();

    //2. add event-listerner to the set alarm button
    document.querySelector(DOM.alarmBtn).addEventListener('click', ctrlAddAlarm)
  }

  

  var ctrlAddAlarm = function(){
    var input, newAlarm;

    //1. Open the modal 

    //3. Get the set date and time for alarm 

    input = UICtrl.getinput();

    //4 add alarm to the alarm controller

    newAlarm = alarmCtrl.addAlarm(input.value)

    //5.add to the UI


    //6. Calculate time for the alarm to go off

    //7.  sound the alarm

    //8. stop the alarm
    alarmCtrl.testing();
    //9. snooze the alarm

  };

  return {
    init: function (){
      console.log('app started');
      setupEventListeners();
    }
  }


  
})(alarmController, UIController );

controller.init();
 
