import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as u,i as s}from"./assets/vendor-651d7991.js";const o=document.querySelector("button"),d=document.querySelector("[data-days]"),m=document.querySelector("[data-hours]"),h=document.querySelector("[data-minutes]"),y=document.querySelector("[data-seconds]");class f{constructor(e,a){this.intervalId=null,this.collectTime=e}start(){this.intervalId=setInterval(()=>{const e=this.selectedDates-Date.now();d.textContent=S(this.collectTime(e).days),m.textContent=this.collectTime(e).hours,h.textContent=this.collectTime(e).minutes,y.textContent=this.collectTime(e).seconds},1e3)}cleanInterval(){clearInterval(this.intervalId)}}o.addEventListener("click",()=>{n.start()});function S(t){return t.toString().padStart(2,"0")}const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){n.selectedDates=t[0],n.selectedDates<Date.now()?(o.disabled=!0,s.show({title:"Hey",message:"Please choose a date in the future"}),console.log(s)):o.disabled=!1}};document.querySelector("#datetime-picker");u("#datetime-picker",p);function v(t){const c=Math.floor(t/864e5),r=Math.floor(t%864e5/36e5),i=Math.floor(t%864e5%36e5/6e4),l=Math.floor(t%864e5%36e5%6e4/1e3);return{days:c,hours:r,minutes:i,seconds:l}}const n=new f(v);
//# sourceMappingURL=commonHelpers.js.map
