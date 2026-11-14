(()=>{
 const host=document.getElementById('stories-browser');if(!host)return;
 const cards=[...host.querySelectorAll('.story-card')],grid=host.querySelector('#stories-results'),search=host.querySelector('#story-search'),order=host.querySelector('#story-order'),buttons=[...host.querySelectorAll('[data-story-topic]')];
 const normal=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
 const valid=new Set(buttons.map(b=>b.dataset.storyTopic));let topic='all',limit=6;
 const read=()=>{const p=new URLSearchParams(location.search);topic=valid.has(p.get('topic'))?p.get('topic'):'all';search.value=p.get('q')||'';order.value=['newest','title'].includes(p.get('sort'))?p.get('sort'):'suggested';limit=6;};
 const url=push=>{const p=new URLSearchParams();if(topic!=='all')p.set('topic',topic);if(search.value.trim())p.set('q',search.value.trim());if(order.value!=='suggested')p.set('sort',order.value);history[push?'pushState':'replaceState'](null,'',location.pathname+(p.size?'?'+p:''));};
 const render=()=>{
  const q=normal(search.value.trim()),id=/^#?\d+$/.test(q)?q.replace('#','').padStart(4,'0'):null,words=(id||q).split(/\s+/).filter(Boolean);
  const found=cards.filter(c=>(topic==='all'||c.dataset.topics.split(' ').includes(topic))&&words.every(w=>normal(c.dataset.search).includes(w)));
  found.sort((a,b)=>{if(order.value==='title')return a.dataset.title.localeCompare(b.dataset.title);if(order.value==='suggested'&&topic==='greatest')return Number(a.dataset.rank)-Number(b.dataset.rank);if(order.value==='suggested'&&topic==='postcard-dna')return ['postcard-dna-pugh-524','postcard-dna-market-building','postcard-dna-bayer-white-margins','postcard-dna-cumming-montague'].indexOf(a.dataset.storySlug)-['postcard-dna-pugh-524','postcard-dna-market-building','postcard-dna-bayer-white-margins','postcard-dna-cumming-montague'].indexOf(b.dataset.storySlug);if(order.value==='suggested'&&topic==='photographers'){const pa=a.dataset.storySlug==='photographers-of-prince-edward-island',pb=b.dataset.storySlug==='photographers-of-prince-edward-island';if(pa!==pb)return pa?-1:1;}return b.dataset.updated.localeCompare(a.dataset.updated)||a.dataset.title.localeCompare(b.dataset.title);});
  cards.forEach(c=>c.hidden=true);found.forEach((c,i)=>{grid.append(c);c.hidden=i>=limit;});
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.storyTopic===topic)));
  const active=buttons.find(b=>b.dataset.storyTopic===topic),label=topic==='all'?(q?'Search results':'Recently added & updated'):active.querySelector('.topic-name').childNodes[0].textContent.trim();
  host.querySelector('#stories-result-title').textContent=label;
  host.querySelector('#stories-result-count').textContent=`${Math.min(limit,found.length)} of ${found.length} ${found.length===1?'story':'stories'}`;
  host.querySelector('#stories-empty').hidden=found.length>0;
  host.querySelector('#stories-more-controls').hidden=found.length<=limit;
  host.querySelector('#stories-reset').hidden=topic==='all'&&!q&&order.value==='suggested';
 };
 buttons.forEach(b=>b.addEventListener('click',()=>{topic=b.dataset.storyTopic;limit=6;url(true);render();}));
 search.addEventListener('input',()=>{limit=6;url(false);render();});
 order.addEventListener('change',()=>{limit=6;url(false);render();});
 host.querySelector('#stories-reset').addEventListener('click',()=>{topic='all';search.value='';order.value='suggested';limit=6;url(true);render();});
 host.querySelector('#stories-more').addEventListener('click',()=>{const n=limit;limit+=6;render();const first=[...grid.children].filter(c=>!c.hidden)[n]?.querySelector('h3 a');first?.focus({preventScroll:true});});
 host.querySelector('#stories-show-all').addEventListener('click',()=>{limit=cards.length;render();});
 addEventListener('popstate',()=>{read();render();});host.querySelector('#stories-controls').hidden=false;read();render();
})();
