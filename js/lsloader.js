window.lsloader={jsRunSequence:[],jsnamemap:{},cssnamemap:{}},lsloader.removeLS=function(e){try{localStorage.removeItem(e)}catch(e){}},lsloader.setLS=function(e,t){try{localStorage.setItem(e,t)}catch(e){}},lsloader.getLS=function(e){var t="";try{t=localStorage.getItem(e)}catch(e){t=""}return t},versionString="/*"+materialVersion+"*/",lsloader.clean=function(){try{for(var e=[],t=0;t<localStorage.length;t++)e.push(localStorage.key(t));e.forEach(function(e){var t=lsloader.getLS(e);t&&-1===t.indexOf(versionString)&&lsloader.removeLS(e)})}catch(e){}},lsloader.clean(),lsloader.load=function(e,t,s){var n;if(s=s||function(){},(n=this.getLS(e))&&-1===n.indexOf(versionString))return this.removeLS(e),void this.requestResource(e,t,s);if(n){var a=n.split(versionString)[0];if(a!=t)return console.log("reload:"+t),this.removeLS(e),void this.requestResource(e,t,s);n=n.split(versionString)[1],/\.js?.+$/.test(a)?(this.jsRunSequence.push({name:e,code:n}),this.runjs(t,e,n)):(document.getElementById(e).appendChild(document.createTextNode(n)),s())}else this.requestResource(e,t,s)},lsloader.requestResource=function(t,s,e){var n=this;/\.js?.+$/.test(s)?this.iojs(s,t,function(e,t,s){n.setLS(t,e+versionString+s),n.runjs(e,t,s)}):/\.css?.+$/.test(s)&&this.iocss(s,t,function(e){document.getElementById(t).appendChild(document.createTextNode(e)),n.setLS(t,s+versionString+e)},e)},lsloader.iojs=function(t,s,e){var n=this;n.jsRunSequence.push({name:s,code:""});try{var a=new XMLHttpRequest;a.open("get",t,!0),a.onreadystatechange=function(){if(4==a.readyState){if((200<=a.status&&a.status<300||304==a.status)&&""!=a.response)return void e(t,s,a.response);n.jsfallback(t,s)}},a.send(null)}catch(e){n.jsfallback(t,s)}},lsloader.iocss=function(t,s,e,n){var a=this;try{var u=new XMLHttpRequest;u.open("get",t,!0),u.onreadystatechange=function(){if(4==u.readyState){if((200<=u.status&&u.status<300||304==u.status)&&""!=u.response)return e(u.response),void n();a.cssfallback(t,s,n)}},u.send(null)}catch(e){a.cssfallback(t,s,n)}},lsloader.iofonts=function(t,s,e,n){var a=this;try{var u=new XMLHttpRequest;u.open("get",t,!0),u.onreadystatechange=function(){if(4==u.readyState){if((200<=u.status&&u.status<300||304==u.status)&&""!=u.response)return e(u.response),void n();a.cssfallback(t,s,n)}},u.send(null)}catch(e){a.cssfallback(t,s,n)}},lsloader.runjs=function(e,t,s){if(t&&s)for(var n in this.jsRunSequence)this.jsRunSequence[n].name==t&&(this.jsRunSequence[n].code=s);if(this.jsRunSequence[0]&&this.jsRunSequence[0].code&&"failed"!=this.jsRunSequence[0].status)(a=document.createElement("script")).appendChild(document.createTextNode(this.jsRunSequence[0].code)),a.type="text/javascript",document.getElementsByTagName("head")[0].appendChild(a),this.jsRunSequence.shift(),0<this.jsRunSequence.length&&this.runjs();else if(this.jsRunSequence[0]&&"failed"==this.jsRunSequence[0].status){var a,u=this;(a=document.createElement("script")).src=this.jsRunSequence[0].path,a.type="text/javascript",this.jsRunSequence[0].status="loading",a.onload=function(){u.jsRunSequence.shift(),0<u.jsRunSequence.length&&u.runjs()},document.body.appendChild(a)}},lsloader.tagLoad=function(e,t){this.jsRunSequence.push({name:t,code:"",path:e,status:"failed"}),this.runjs()},lsloader.jsfallback=function(e,t){if(!this.jsnamemap[t]){for(var s in this.jsnamemap[t]=t,this.jsRunSequence)this.jsRunSequence[s].name==t&&(this.jsRunSequence[s].code="",this.jsRunSequence[s].status="failed",this.jsRunSequence[s].path=e);this.runjs()}},lsloader.cssfallback=function(e,t,s){if(!this.cssnamemap[t]){this.cssnamemap[t]=1;var n=document.createElement("link");n.type="text/css",n.href=e,n.rel="stylesheet",n.onload=n.onerror=s;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a)}},lsloader.runInlineScript=function(e,t){var s=document.getElementById(t).innerText;this.jsRunSequence.push({name:e,code:s}),this.runjs()},lsloader.loadCombo=function(e){var t="",s={};for(var n in e){var a=this.getLS(e[n].name);if(a)var u=a.split(versionString)[0],i=a.split(versionString)[1];else u="";u==e[n].path?this.jsRunSequence.push({name:e[n].name,code:i,path:e[n].path}):(this.jsRunSequence.push({name:e[n].name,code:null,path:e[n].path,status:"comboloading"}),s[e[n].name]=!0,t+=(""==t?"":";")+e[n].path)}var o=this;if(t){var r=new XMLHttpRequest;r.open("get",combo+t,!0),r.onreadystatechange=function(){if(4==r.readyState)if(200<=r.status&&r.status<300||304==r.status){if(""!=r.response)return void o.runCombo(r.response,s)}else{for(var e in o.jsRunSequence)s[o.jsRunSequence[e].name]&&(o.jsRunSequence[e].status="failed");o.runjs()}},r.send(null)}this.runjs()},lsloader.runCombo=function(e,t){for(var s in(e=e.split("/*combojs*/")).shift(),this.jsRunSequence)t[this.jsRunSequence[s].name]&&e[0]&&(this.jsRunSequence[s].status="comboJS",this.jsRunSequence[s].code=e[0],this.setLS(this.jsRunSequence[s].name,this.jsRunSequence[s].path+versionString+e[0]),e.shift());this.runjs()};