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

// CDCP notice: shows on every visit to the home page.
// Desktop gets the popup; phones get a small bottom bar that opens it (Google penalizes full-screen popups on mobile).
(function(){
  var d=document.getElementById("cdcpPopup"), bar=document.getElementById("cdcpBar");
  if(!d||typeof d.showModal!=="function") return;
  function hideBar(){ if(bar) bar.hidden=true; }
  d.addEventListener("click",function(e){ if(e.target===d) d.close(); });
  d.querySelectorAll("[data-cdcp-close]").forEach(function(b){ b.addEventListener("click",function(){ d.close(); }); });
  if(bar){
    bar.querySelector("[data-cdcp-open]").addEventListener("click",function(){ hideBar(); d.showModal(); });
    bar.querySelector("[data-cdcp-bar-close]").addEventListener("click",hideBar);
  }
  var phone=window.matchMedia("(max-width: 640px)").matches;
  setTimeout(function(){ if(phone && bar) bar.hidden=false; else d.showModal(); }, phone?600:1200);
})();
