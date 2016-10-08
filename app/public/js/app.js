/**
 * SUPER DACS !!!
 *
 * @author Vanderlei Sbaraini Amancio
 */

 var app = new Vue({
   el: '#app',

   data: {
     clientes: [],
     pg: 'clientes.lista',
     edit: null,
   },

   mounted: function () {
     this.$nextTick(function () {
       this.buscar();
     });
   },

   methods: {
     adicionar: function () {
       this.pg = 'clientes.editar';
       this.edit = {
         _original: null,
         NOME: '',
         ENDERECO: '',
         EMAIL: ''
       };
     },

     editar: function (it, index) {
       this.pg = 'clientes.editar';
       this.edit = JSON.parse(JSON.stringify($.extend({ _original: index}, it)));
     },

     remover: function (it, index) {
       var that = this;
       this.$http.delete('/api/clientes/' + it.OID).then(
         function (rsp) {
           that.clientes.splice(index, 1);
         },
         function (err) {
           console.log(err);
         }
       );
     },

     salvar: function () {
       var that = this;

       var data = {
         NOME: this.edit.NOME,
         ENDERECO: this.edit.ENDERECO,
         EMAIL: this.edit.EMAIL,
       };

       var req;

       if (this.edit._original) {
         this.clientes[this.edit._original] = data;
         req = this.$http.put('/api/clientes/' + this.edit.OID, data).then(
           function (rsp) {
             window.alert('Salvo!!');
             this.edit = null;
             this.pg = 'clientes.lista';
           },
           function (err) {
             console.log(err);
           }
         );
       } else {
         req = this.$http.post('/api/clientes', data).then(
           function (rsp) {
             window.alert('Salvo!!');
             this.buscar();
             this.edit = null;
             this.pg = 'clientes.lista';
           },
           function (err) {
             console.log(err);
           }
         );
       }
     },

     cancelar: function () {
       this.pg = 'clientes.lista';
       this.edit = null;
     },

     buscar: function () {
       var that = this;
       this.$http.get('/api/clientes').then(
         function (rsp) {
           that.clientes = rsp.data.data;
         },
         function (err) {
           console.log(err);
         }
       );
     }
   }
 });
