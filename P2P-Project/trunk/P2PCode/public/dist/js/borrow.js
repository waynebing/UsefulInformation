$(function(){$.get("/users/getCookie",function(o){var r=o.username;$("#borrowPerson").val(r)}),$("#borrowSubmit").on("click",function(){var o=$("#borrowForm").serialize();$.post("/borrows/apply",o,function(o){o.isSuccess?(alert("提交成功!"),location.href="/loan.html"):alert("提交失败！请核实")})})});