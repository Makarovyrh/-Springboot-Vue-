webpackJsonp([8],{qnfp:function(t,e){},tj2P:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("BO1k"),r=i.n(a),n=i("gyMJ"),l={name:"SingerPage",mixins:[i("msXN").a],data:function(){return{centerDialogVisible:!1,editVisible:!1,delVisible:!1,registerForm:{name:"",sex:"",birth:"",location:"",introduction:""},editForm:{id:"",name:"",sex:"",birth:"",location:"",introduction:""},tableData:[],tempData:[],select_word:"",pageSize:5,currentPage:1,idx:-1,multipleSelection:[]}},computed:{data:function(){return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)}},created:function(){this.getData()},methods:{getSinger:function(){if(""==this.select_word)this.tableData=this.tempData;else{this.tableData=[];var t=!0,e=!1,i=void 0;try{for(var a,n=r()(this.tempData);!(t=(a=n.next()).done);t=!0){var l=a.value;l.name.includes(this.select_word)&&this.tableData.push(l)}}catch(t){e=!0,i=t}finally{try{!t&&n.return&&n.return()}finally{if(e)throw i}}}},handleCurrentChange:function(t){this.currentPage=t},getData:function(){var t=this;this.tableData=[],this.tempData=[],Object(n.g)().then(function(e){t.tableData=e,t.tempData=e})},handleEdit:function(t){this.editVisible=!0,this.editForm={id:t.id,name:t.name,sex:t.sex,birth:t.birth,location:t.location,introduction:t.introduction}},editSave:function(){var t=this,e=new Date(this.editForm.birth),i=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate(),a=new URLSearchParams;a.append("id",this.editForm.id),a.append("name",this.editForm.name),a.append("sex",this.editForm.sex),a.append("birth",i),a.append("location",this.editForm.location),a.append("introduction",this.editForm.introduction),Object(n.s)(a).then(function(e){1==e.code?(t.getData(),t.notify("修改成功","success")):t.notify("修改失败","error")}).catch(function(t){console.log(t)}),this.editVisible=!1},addSinger:function(){var t=this,e=this.registerForm.birth,i=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate(),a=new URLSearchParams;a.append("name",this.registerForm.name),a.append("sex",this.registerForm.sex),a.append("pic","/img/singerPic/hhh.jpg"),a.append("birth",i),a.append("location",this.registerForm.location),a.append("introduction",this.registerForm.introduction),Object(n.m)(a).then(function(e){1==e.code?(t.getData(),t.notify("添加成功","success")):t.notify("添加失败","error")}).catch(function(t){console.log(t)}),this.centerDialogVisible=!1},delRow:function(){var t=this;Object(n.c)(this.idx).then(function(e){e?(t.getData(),t.notify("删除成功","success")):t.notify("删除失败","error")}).catch(function(t){console.log(t)}),this.delVisible=!1},songEdit:function(t,e){this.$router.push({path:"/Song",query:{id:t,name:e}})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"table"},[i("div",{staticClass:"container"},[i("div",{staticClass:"handle-box"},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.delAll}},[t._v("批量删除")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:function(e){t.centerDialogVisible=!0}}},[t._v("添加歌手")]),t._v(" "),i("el-input",{staticClass:"handle-input",attrs:{size:"medium",placeholder:"        请输入歌手名"},model:{value:t.select_word,callback:function(e){t.select_word=e},expression:"select_word"}}),t._v(" "),i("el-button",{staticClass:"handle-getButton",attrs:{type:"primary",size:"medium"},on:{click:t.getSinger}},[t._v("查询")])],1)]),t._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{size:"medium",border:"",height:"680px",data:t.data},on:{"selection-change":t.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"60",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"歌手图片",width:"110",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"singer-img"},[i("img",{staticStyle:{width:"100%"},attrs:{src:t.getUrl(e.row.pic)}})])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"歌手名",prop:"name",width:"100",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"性别",width:"60",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.changeSex(e.row.sex))+"\n      ")]}}])}),t._v(" "),i("el-table-column",{attrs:{width:"120",label:"出生日期",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n        "+t._s(t.attachBirthday(e.row.birth))+"\n      ")]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"地区",prop:"location",width:"110",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"简介",align:"center",width:"400"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("p",{staticStyle:{height:"90px",overflow:"scroll"}},[t._v(t._s(e.row.introduction))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"歌曲管理",width:"170",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"medium"},on:{click:function(i){return t.songEdit(e.row.id,e.row.name)}}},[t._v("歌曲管理")])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",width:"280",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"medium"},on:{click:function(i){return t.handleEdit(e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{staticClass:"button-space",attrs:{size:"medium",type:"danger"},on:{click:function(i){return t.handleDelete(e.row.id)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{background:"",layout:"total,prev,pager,next","current-page":t.currentPage,"page-size":t.pageSize,total:t.tableData.length},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),i("el-dialog",{attrs:{title:"添加歌手",visible:t.centerDialogVisible,width:"400px",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[i("el-form",{ref:"registerForm",attrs:{model:t.registerForm,"label-width":"80px"}},[i("el-form-item",{attrs:{prop:"name",label:"歌手名",size:"mini"}},[i("el-input",{attrs:{placeholder:"歌手名"},model:{value:t.registerForm.name,callback:function(e){t.$set(t.registerForm,"name",e)},expression:"registerForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"性别",size:"mini"}},[i("el-radio-group",{model:{value:t.registerForm.sex,callback:function(e){t.$set(t.registerForm,"sex",e)},expression:"registerForm.sex"}},[i("el-radio",{attrs:{label:0}},[t._v("女")]),t._v(" "),i("el-radio",{attrs:{label:1}},[t._v("男")]),t._v(" "),i("el-radio",{attrs:{label:2}},[t._v("组合")]),t._v(" "),i("el-radio",{attrs:{label:3}},[t._v("不明")])],1)],1),t._v(" "),i("el-form-item",{attrs:{prop:"birth",label:"生日",size:"mini"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:t.registerForm.birth,callback:function(e){t.$set(t.registerForm,"birth",e)},expression:"registerForm.birth"}})],1),t._v(" "),i("el-form-item",{attrs:{prop:"location",label:"地区",size:"mini"}},[i("el-input",{attrs:{placeholder:"地区"},model:{value:t.registerForm.location,callback:function(e){t.$set(t.registerForm,"location",e)},expression:"registerForm.location"}})],1),t._v(" "),i("el-form-item",{attrs:{prop:"introduction",label:"简介",size:"mini"}},[i("el-input",{attrs:{placeholder:"简介",type:"textarea"},model:{value:t.registerForm.introduction,callback:function(e){t.$set(t.registerForm,"introduction",e)},expression:"registerForm.introduction"}})],1)],1),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:t.addSinger}},[t._v("确定")]),t._v(" "),i("el-button",{attrs:{size:"medium"},on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取消")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"编辑歌手",visible:t.editVisible,width:"400px",center:""},on:{"update:visible":function(e){t.editVisible=e}}},[i("el-form",{ref:"editForm",attrs:{model:t.editForm,"label-width":"80px"}},[i("el-form-item",{attrs:{prop:"name",label:"歌手名",size:"mini"}},[i("el-input",{attrs:{placeholder:"歌手名"},model:{value:t.editForm.name,callback:function(e){t.$set(t.editForm,"name",e)},expression:"editForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"性别",size:"mini"}},[i("el-radio-group",{model:{value:t.editForm.sex,callback:function(e){t.$set(t.editForm,"sex",e)},expression:"editForm.sex"}},[i("el-radio",{attrs:{label:0}},[t._v("女")]),t._v(" "),i("el-radio",{attrs:{label:1}},[t._v("男")]),t._v(" "),i("el-radio",{attrs:{label:2}},[t._v("组合")]),t._v(" "),i("el-radio",{attrs:{label:3}},[t._v("不明")])],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"生日",size:"mini"}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:t.editForm.birth,callback:function(e){t.$set(t.editForm,"birth",e)},expression:"editForm.birth"}})],1),t._v(" "),i("el-form-item",{attrs:{prop:"location",label:"地区",size:"mini"}},[i("el-input",{attrs:{placeholder:"地区"},model:{value:t.editForm.location,callback:function(e){t.$set(t.editForm,"location",e)},expression:"editForm.location"}})],1),t._v(" "),i("el-form-item",{attrs:{prop:"introduction",label:"简介",size:"mini"}},[i("el-input",{attrs:{placeholder:"简介",type:"textarea"},model:{value:t.editForm.introduction,callback:function(e){t.$set(t.editForm,"introduction",e)},expression:"editForm.introduction"}})],1)],1),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:t.editSave}},[t._v("确定")]),t._v(" "),i("el-button",{attrs:{size:"medium"},on:{click:function(e){t.editVisible=!1}}},[t._v("取消")])],1)],1),t._v(" "),i("el-dialog",{attrs:{title:"删除歌手",visible:t.delVisible,width:"400px",center:""},on:{"update:visible":function(e){t.delVisible=e}}},[i("div",{attrs:{align:"center"}},[t._v("删除不可恢复，是否确定删除")]),t._v(" "),i("span",{attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"medium"},on:{click:t.delRow}},[t._v("确定")]),t._v(" "),i("el-button",{attrs:{size:"medium"},on:{click:function(e){t.delVisible=!1}}},[t._v("取消")])],1)])],1)},staticRenderFns:[]};var s=i("VU/8")(l,o,!1,function(t){i("qnfp")},"data-v-52a56f60",null);e.default=s.exports}});
//# sourceMappingURL=8.6ac22bb84bd671c9d2ba.js.map