$(document).ready(init);

function init() {
  getPagamenti();

  // al click sul cestino parte la funzione deletePagamento RICORDA event delegation
  $(document).on("click","i.delete",deletePagamento);
}

function getPagamenti() {

  $.ajax({
    url:"pagamenti.php",
    method: "GET",
    success: function (data) {
      // console.log(data);

      printPagamenti(data);
    },
    error: function (err) {
      console.error(err);
    }
  });
}

function printPagamenti(pagamenti) {
  var target = $("#pagamenti");

  // inizializzo template handlebars
  var template = $("#pagamento-template").html();
  var compiled = Handlebars.compile(template);

  for (var pagamento of pagamenti){
    var pagamentoHtml = compiled(pagamento);
    target.append(pagamentoHtml);
    // console.log(pagamento);
  }
}

function deletePagamento() {
  var me = $(this);
  var pagamentoHtml = me.parent();
  var id = pagamentoHtml.data("id");
  console.log("l'id del pagamento selezionato è", id);

  var conferma = confirm("Sei sicuro di eliminare definitivamente il pagamento con id " + id + "?");

  if (conferma){

    $.ajax({
      url:"deletePagamento.php",
      method: "POST",
      data: {
        "id": id
      },
      success: function () {
        // console.log("cancellato pagamento con id " + id);
        
        // pagamentoHtml.remove();

        // per effetto rallentato
        pagamentoHtml.fadeOut("slow", function(){
          pagamentoHtml.remove();
        })
      },
      error: function (err) {
        console.error(err);
      }
    });
  }
}
