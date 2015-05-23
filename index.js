angular.module('formBuilder', ['ngLodash'])
.controller('FormController', function(lodash) {
  var form = this;

  form.tree = [];
  form.types= ["text", "object"];

  var counter = 0;

  form.addNode = function (data) {
    var node = {
      key:"",
      value:"",
      id:counter,
      children:[]
    }

    if(!data)
      form.tree.push(node);
    else
      data.children.push(node);

    ++counter;
  }

  form.removeNode = function (target) {
    form.tree = _removeNode_helper(form.tree, target.id)
    console.log(target.id);
  }

  var _removeNode_helper = function (data, target) {
    for(var i = 0; i < data.length; ++i){
      if(data[i].id === target){
        data.splice(i, 1);
        return data;
      }
      if(data[i].type == "object")
        data[i].children = _removeNode_helper(data[i].children, target);
    }
    return data;
  }

  form.context = function(data){
    if(data)
      return data.children;
    else
      return form.tree;
  }

  form.compress = function(data){
    var obj = new Object();
    for (var i = 0; i < data.length; ++i){
      if (data[i].type == 'text')
        obj[data[i].key] = data[i].text;
      if (data[i].type == 'object')
        obj[data[i].key] = form.compress(data[i].children);
    }
    return obj;
  }

});
