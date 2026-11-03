// Mobile menu
(function(){
  var btn=document.getElementById("menuBtn"), nav=document.getElementById("navLinks");
  if(btn&&nav) btn.addEventListener("click",function(){var o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(o))});

  // Appointment form (Web3Forms)
  var f=document.getElementById("apptForm"); if(!f) return;
  var err=document.getElementById("formErr"), ok=document.getElementById("formOk"), submit=f.querySelector('button[type=submit]');
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var valid=["fname","lname","phone"].every(function(id){return f[id].value.trim()}) && /\S+@\S+\.\S+/.test(f.email.value);
    err.hidden=valid; if(!valid) return;
    submit.disabled=true; submit.textContent="Sending...";
    var data=new FormData(f);
    data.append("name",f.fname.value.trim()+" "+f.lname.value.trim());
    fetch(f.action,{method:"POST",headers:{Accept:"application/json"},body:data})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok&&j.success,j:j}})})
      .then(function(res){
        if(res.ok){ok.classList.remove("err");ok.innerHTML="<strong>Thank you, your request was sent.</strong> Our team will reach out within 1 to 2 business days.";ok.hidden=false;f.reset();submit.textContent="Request sent"}
        else throw new Error();
      })
      .catch(function(){
        ok.classList.add("err");ok.innerHTML="<strong>Your request didn't go through.</strong> Please call us at <a href=\"tel:+13652309200\">(365) 230-9200</a> or email info@gardensquarefamilydentistry.com.";ok.hidden=false;
        submit.disabled=false;submit.textContent="Request appointment";
      });
  });
})();

// CDCP popup: shows on the home page once, then stays hidden for 7 days after it's closed
(function(){
  var d=document.getElementById("cdcpPopup"); if(!d||typeof d.showModal!=="function") return;
  var KEY="gsfd_cdcp_closed", WEEK=7*24*60*60*1000;
  try{ var t=+localStorage.getItem(KEY); if(t && Date.now()-t<WEEK) return; }catch(e){}
  function remember(){ try{ localStorage.setItem(KEY,String(Date.now())); }catch(e){} }
  d.addEventListener("close",remember);
  d.addEventListener("click",function(e){ if(e.target===d) d.close(); });
  d.querySelectorAll("[data-cdcp-close]").forEach(function(b){ b.addEventListener("click",function(){ d.close(); }); });
  d.querySelectorAll("[data-cdcp-dismiss]").forEach(function(a){ a.addEventListener("click",remember); });
  setTimeout(function(){ d.showModal(); },1200);
})();
