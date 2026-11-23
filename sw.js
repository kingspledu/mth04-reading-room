'use strict';
const PREFIX='story-reader-mth04-reading-room-';
const CACHE=PREFIX+'929fb088943e';
const ROOT=new URL('./',self.location).href;
const CORE=['./part-01-01.html','./part-01-02.html','./part-02-01.html','./part-03-01.html','./part-04-01.html','./part-05-01.html','./part-06-01.html','./part-07-01.html','./part-08-01.html','./part-08-02.html','./part-09-01.html','./part-10-01.html','./part-10-02.html','./learning.js','./learning.css','./vocabulary.json','./characters.html','./','./style.css?v=4b716fe42622','./app.js?v=4b716fe42622','./pwa.js?v=4b716fe42622','./manifest.webmanifest','./assets/app-icon-192.png','./assets/app-icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||!url.href.startsWith(ROOT))return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(async response=>{if(response.ok){const cache=await caches.open(CACHE);await cache.put(ROOT,response.clone())}return response}).catch(async()=>{const cache=await caches.open(CACHE);return await cache.match(ROOT)||Response.error()}));return;
 }
 event.respondWith(fetch(request).then(async response=>{if(response.ok){const cache=await caches.open(CACHE);await cache.put(request,response.clone())}return response}).catch(async()=>await caches.match(request)||Response.error()));
});
