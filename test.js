function ViewModel() {
    var viewmodel = this;

    viewmodel.loading = ko.observable(false);
    viewmodel.modal = $("#idSholdNotChange");
    
    $.confirm({
        title: '',
        content: 'Essa operação terá efeito nos saldos apresentados no sistema. Alterar saldo inicial?',
        buttons: {
            "Cancelar": {},
            'Alterar': {
                action: function () {
                    console.log("bleee");
                }
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: '/Do/Stuff',
        data: data,
        success: function (result) {
            Loader.stop();
        },
        error: function (e) {
            Loader.stop();
            notificar.erro('Não foi possível do stuff.')
        }
    });


    viewmodel.moreStuff = function () {
        viewmodel.inicializarStuff();
        viewmodel.Welcome.modal({ backdrop: 'static' });
        viewmodel.Welcome.on('hidden.bs.modal', function () {
            viewmodel.fuck(null);
        });
    }
}