$(function(){
	var i = Number(localStorage.getItem('aluno-contador')) + 1;
	var j, k, orderList;
	var $aluno = $("#NomeAluno");
	var $alunoList = $("#alunos");
	var order = [];
	orderList = localStorage.getItem('aluno-cadastro');
	
	if(!orderList){
		$("#semErros").css("display","block");
	}

	
		// Carregar Lista de Alunos
		
		orderList = orderList ? orderList.split(',') : [];   
		for( j = 0, k = orderList.length; j < k; j++) {
			$alunoList.append(
				"<li id='" + orderList[j] + "'>"
				+ "<a class='editable' data-split-theme='c'>"	
				+ localStorage.getItem(orderList[j]) 
				+ "</a> <a href='#' class='close' data-icon='delete' data-theme='c'>X</a></li>"
			);
		}
    
	// Incluir Alunos 
	$("#sbalunos").live("tap", function() {
		if($aluno.val() != ""){
			localStorage.setItem("aluno-"+i, $aluno.val());
			localStorage.setItem("aluno-contador",i);
			$("#semErros").css("display","none");
			$alunoList.append(
				"<li id='aluno-" + i + "'>" 
				+  "<a class='editable' data-split-theme='c'>" 
				+ localStorage.getItem("aluno-" + i) 
				+ " </a><a href='#' data-icon='delete' class='close' data-theme='c'>x</a></li>"
			);
			$.mobile.changePage("#sbpalunos", { transition: "slidedown"});		
			listaAlunos();
			$aluno.val("");
			
			i++
		} 
		return false;
	});	

/*	
	// Excluir Pizzas
	$("#pizzas li a.close").live("tap", function() {
		//alert($(this).parent().attr("id"));
		localStorage.removeItem($(this).parent().attr("id"));
		 $(this).parent().slideUp('normal', function(){
				$(this).remove();
				listaPizzas();
			});
		 	
		return false;
	});
	
	function listaPizzas(){
		var $pizzaLi = $("#pizzas li");
		order.length = 0;
		
		$pizzaLi.each(function(){
			var id = $(this).attr("id");
			order.push(id);
		});
		$('ul').listview('refresh');
		localStorage.setItem("pizza-cadastro", order.join(","));	
	}	
});
*/