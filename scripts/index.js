console.log("Hello World!")

setInterval(() =>{
    $("h1 .header-class").text("whatever")
    setTimeout(() =>{
        $("h1 .header-class").text("Hello World!")
    },1000)
}, 2000)