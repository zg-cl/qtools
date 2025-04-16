import{_ as R,r as d,q as i,x as o,I as _,y as k,D as y,u as w,R as I,L as p,A as S,Q as L,E as m,K as B,O as T,s as r}from"./index-D4dRBtAy.js";const A={class:"tool-container"},M={class:"quality-control"},V={key:0,class:"images-list"},N={class:"batch-actions"},$=["src"],j={class:"image-info"},q={class:"size-info"},K={class:"image-actions"},O=["onClick"],Q=["onClick"],W={key:1,class:"error-message"},G={__name:"ImageTool",setup(H){const U=d(null),c=d(.8),u=d(""),n=d([]),b=t=>{Array.from(t.target.files).forEach(v)},F=t=>{Array.from(t.dataTransfer.files).forEach(v)},v=async t=>{if(!t.type.match("image.*")){u.value="请选择有效的图片文件";return}const e=new FileReader;e.onload=s=>{const a={originalUrl:s.target.result,originalSize:(t.size/1024).toFixed(2),compressedUrl:"",compressedSize:0,name:t.name};n.value.push(a),g(a,n.value.length-1)},e.readAsDataURL(t)},g=(t,e)=>{const s=new Image;s.src=t.originalUrl,s.onload=()=>{const a=document.createElement("canvas"),l=a.getContext("2d"),h=Math.min(1920/s.width,1);a.width=s.width*h,a.height=s.height*h,l.fillStyle="#FFFFFF",l.fillRect(0,0,a.width,a.height),l.drawImage(s,0,0,a.width,a.height),a.toBlob(f=>{const D=URL.createObjectURL(f);n.value[e]={...t,compressedUrl:D,compressedSize:(f.size/1024).toFixed(2)}},"image/jpeg",c.value)}},x=()=>{n.value.forEach((t,e)=>{g(t,e)})},C=t=>{const e=document.createElement("a");e.download=t.name,e.href=t.compressedUrl,e.click()},E=t=>{URL.revokeObjectURL(n.value[t].compressedUrl),n.value.splice(t,1)},z=()=>{n.value.forEach((t,e)=>{setTimeout(()=>{const s=document.createElement("a");s.download=t.name,s.href=t.compressedUrl,s.click()},e*500)})};return(t,e)=>(r(),i("div",A,[o("div",{class:"upload-area",onDragover:e[1]||(e[1]=p(()=>{},["prevent"])),onDrop:p(F,["prevent"]),onDragenter:e[2]||(e[2]=p(()=>{},["prevent"]))},[o("input",{type:"file",accept:"image/*",onChange:b,hidden:"",ref_key:"fileInput",ref:U,multiple:""},null,544),o("button",{onClick:e[0]||(e[0]=s=>t.$refs.fileInput.click()),class:"upload-btn"},[k(w(I),{icon:"mdi:upload",class:"upload-icon"}),e[4]||(e[4]=y(" 点击上传或拖放图片（支持多选） "))])],32),o("div",M,[e[5]||(e[5]=o("label",null,"压缩质量：",-1)),S(o("input",{type:"range",min:"0",max:"1",step:"0.1","onUpdate:modelValue":e[3]||(e[3]=s=>c.value=s),onInput:x},null,544),[[L,c.value]]),o("span",null,m(Math.round(c.value*100))+"%",1)]),n.value.length>0?(r(),i("div",V,[o("div",N,[o("button",{onClick:z,class:"action-btn primary"},[k(w(I),{icon:"mdi:download-multiple",class:"action-icon"}),e[6]||(e[6]=y(" 下载所有图片 "))])]),(r(!0),i(B,null,T(n.value,(s,a)=>(r(),i("div",{key:a,class:"image-item"},[o("img",{src:s.compressedUrl,alt:"压缩图片预览",class:"preview-image"},null,8,$),o("div",j,[o("div",q," 原始尺寸："+m(s.originalSize)+" KB 压缩后："+m(s.compressedSize)+" KB ",1),o("div",K,[o("button",{onClick:l=>C(s),class:"action-btn"},"下载",8,O),o("button",{onClick:l=>E(a),class:"action-btn danger"}," 删除 ",8,Q)])])]))),128))])):_("",!0),u.value?(r(),i("div",W,m(u.value),1)):_("",!0)]))}},X=R(G,[["__scopeId","data-v-ae11a411"]]);export{X as default};
