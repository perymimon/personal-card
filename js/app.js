var tmpl = '{i}{i}{j}';
var o = {i:1,j:3}
function generateHTML (tpl,data){
    var placeHolderReg = /{([^}])}/g;
    return tpl.replace(placeHolderReg,function(match,p1,offset,string){
        return data[p1]
    });
}