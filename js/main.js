function InvoiceController($scope) {
  $scope.logoRemoved = false;
  $scope.printMode   = false;

  var sample_invoice = {
    invoice_number: 10,
    customer_info:  {
      name    : "Cliente",
      web_link: "www.client.com",
      address1: "Endereço Cliente",
      address2: "Endereço Cliente 2",
      postal: "00000-000"
    },
    company_info: {
      name    : "Vitor Leal Development",
      web_link: "www.vitorleal.com",
      address1: "Rua Guaraiuva 531",
      address2: "63",
      postal  : "04569-001"
    },
    items:[{
      qty: 10,
      description: 'Gadget',
      cost: 9.95
    }]
  };

  if (localStorage["invoice"] == "" || localStorage["invoice"] == null) {
    $scope.invoice = sample_invoice;

  } else {
    $scope.invoice = JSON.parse(localStorage["invoice"]);
  }

  $scope.addItem = function () {
    $scope.invoice.items.push({ qty:0, cost:0, prazo: 1, description:"" });
  }

  $scope.removeLogo = function (element) {
    var elem = angular.element("#remove_logo");

    if (elem.text() == "Mostrar Logo") {
      elem.text("Remover Logo");
      $scope.logoRemoved = false;

    } else {
      elem.text("Mostrar Logo");
      $scope.logoRemoved = true;
    }
  }

  $scope.editLogo = function () {
    $("#imgInp").trigger("click");
  }

  $scope.showLogo = function () {
    $scope.logoRemoved = false;
  }

  $scope.removeItem = function (item) {
    $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
  }

  $scope.invoice_sub_total = function () {
    var total = 0.00;

    angular.forEach($scope.invoice.items, function (item, key) {
      total += (item.qty * item.cost);
    });

    return total;
  }

  $scope.calculate_deadline = function () {
    var total = 0;

    angular.forEach($scope.invoice.items, function (item, key) {
      total += (item.prazo) ? parseInt(item.prazo, 10) : 0;
    });

    return total;
  }

  $scope.calculate_grand_total = function () {
    localStorage["invoice"] = JSON.stringify($scope.invoice);
    return $scope.invoice_sub_total();
  }

  $scope.printInfo = function () {
    window.print();
  }

  $scope.clearLocalStorage = function () {
    var confirmClear = confirm("Are you sure you would like to clear the invoice?");

    if (confirmClear) {
      localStorage["invoice"] = "";
      $scope.invoice = sample_invoice;
    }
  }
};

angular.module('jqanim', []).directive('jqAnimate', function () {
  return function(scope, instanceElement) {
    setTimeout(function () {
      instanceElement.show('slow');
    }, 0);
  }
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
        $('#company_logo').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function () {
  $("#invoice_number").focus();
  $("#imgInp").change(function () {
    readURL(this);
  });
});
