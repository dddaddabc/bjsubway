$(document).ready(function() {
	//随机语录代码开始
    var jj = Math.random() + "";
    var randomNews = jj.charAt(5);
    quotes = new Array;
    quotes[1] = "\u5728\u4e8b\u5b9e\u9762\u524d\uff0c\u6211\u4eec\u7684\u60f3\u8c61\u529b\u8d8a\u53d1\u8fbe\uff0c\u540e\u679c\u5c31\u8d8a\u4e0d\u582a\u8bbe\u60f3\u3002";
    quotes[2] = "\u75db\u82e6\u6e90\u4e8e\u6b32\u671b\u3002";
    quotes[3] = "\u4eba\u7684\u4e00\u751f\u8981\u75af\u72c2\u4e00\u6b21\uff0c\u65e0\u8bba\u662f\u4e3a\u4e00\u4e2a\u4eba\uff0c\u4e00\u6bb5\u60c5\uff0c\u4e00\u6bb5\u65c5\u9014\uff0c\u6216\u4e00\u4e2a\u68a6\u60f3\u3002";
    quotes[4] = "\u6d6a\u6f2b\u662f\u4e00\u88ad\u7f8e\u4e3d\u7684\u665a\u793c\u670d\uff0c\u4f46\u4f60\u4e0d\u80fd\u4e00\u5929\u5230\u665a\u90fd\u7a7f\u7740\u5b83\u3002";
    quotes[5] = "\u628a\u4e00\u5207\u5e73\u51e1\u7684\u4e8b\u505a\u597d\u5373\u4e0d\u5e73\u51e1\uff0c\u628a\u4e00\u5207\u7b80\u5355\u7684\u4e8b\u505a\u597d\u5373\u4e0d\u7b80\u5355\u3002";
    quotes[6] = "\u4f60\u6c38\u8fdc\u770b\u4e0d\u89c1\u6211\u773c\u91cc\u7684\u6cea\uff0c\u56e0\u4e3a\u4f60\u4e0d\u5728\u65f6\u6211\u624d\u4f1a\u54ed\u6ce3\u3002";
    quotes[7] = "\u4e16\u754c\u4e0a\u6700\u8fdc\u7684\u8ddd\u79bb\uff0c\u4e0d\u662f\u7231\uff0c\u4e0d\u662f\u6068\uff0c\u800c\u662f\u719f\u6089\u7684\u4eba\uff0c\u6e10\u6e10\u53d8\u5f97\u964c\u751f\u3002";
    quotes[8] = "\u5fae\u5c0f\u7684\u5e78\u798f\u5c31\u5728\u8eab\u8fb9\uff0c\u5bb9\u6613\u6ee1\u8db3\u5c31\u662f\u5929\u5802\u3002";
    quotes[9] = "\u6709\u65f6\u5019\uff0c\u4e0d\u662f\u5bf9\u65b9\u4e0d\u5728\u4e4e\u4f60\uff0c\u800c\u662f\u4f60\u628a\u5bf9\u65b9\u770b\u7684\u592a\u91cd\u3002";
    quotes[0] = "\u4eba\u751f\u548c\u7231\u60c5\u4e00\u6837\uff0c\u9519\u8fc7\u4e86\u7231\u60c5\u5c31\u9519\u8fc7\u4e86\u4eba\u751f\u3002";
    var quoteNews = quotes[randomNews];
    $(".resultsbar .title").html(quoteNews);
	/*
		每个随机数里面都是unicode	
	*/
	//随机语录代码结束
	
	
    var startZhan, endZhan, querylines;//这三个是查询时 起始站,终点站,查询用的函数
	
	//下面就是全部的功能查询代码
	
    $(".startlines").one("mouseenter",//这里用的one 就是只查询一次,鼠标mouseenter的时候
    function() {
        $(this).css("background-color", "#fff");//改变样式
        $(this).css("border-color", "#2b99ff");//改变样式
        var loaclAllLines = localStorage.getItem("allLines");//这句很重要,就是定义loaclAllLines 是调出 本机缓存 的全部线路.
        if (loaclAllLines != null) {//如果它不等于空,就直接给startlines 加上这个本机缓存
            $(".startlines").append(loaclAllLines)
        } else {//如果不是空,就去查,也就是用户第一次访问的时候.就要走这个else
            var data = "act=line";
            $.getJSON("newway.php", data,
            function(json) {
                var arrLines = "";
                for (var lines in json) {
                    arrLines += '<option value="' + lines + '">' + json[lines] + "</option>"
                }
                localStorage.setItem("allLines", arrLines);//对应的32行的GET,这里是SET.查好把全部线路保存下来
                $(".startlines").append(arrLines)//就直接给startlines 
            });//线路查询就完成了. 下面就是站点查询了.
            var data = "act=zhans";
			/*这里我这块遇到了技术瓶颈,请教了高手也没有找到解决办法.一开始是想的分别查询,后面发现实现起来很困难.
			所以,就在鼠标经过startlines这个select的时候把全部站点,线路都查好保存到本机缓存了.
			*/
			//下面就是查全部站点的.
            $.getJSON("newway.php", data,
            function(json) {
                var arrZhans = "";
                for (var Zhans in json) {
                    arrZhans += Zhans + ":" + json[Zhans]
                }
                localStorage.setItem("localAllZhan", arrZhans)//对应行的GEAllZhanT,这里是SET.查好把全部站点保存下来
            })
        }
    });//这是起始站 select 功能的全部代码.
	
	//下面是终点站 select 功能的全部代码. 他和起始站 select 功能相同的.
	//*****注意这里没有办法写一起的,因为用了one()方法.或许有好的解决方法..待完善吧.不过这种分开结构写也很不错的.
    $(".endlines").one("mouseenter",
    function() {
        $(this).css("background-color", "#fff");
        $(this).css("border-color", "#2b99ff");
        var loaclAllLines = localStorage.getItem("allLines");
        if (loaclAllLines != null) {
            $(".endlines").append(loaclAllLines)
        } else {
            var data = "act=line";
            $.getJSON("newway.php", data,
            function(json) {
                var arrLines = "";
                for (var lines in json) {
                    arrLines += '<option value="' + lines + '">' + json[lines] + "</option>"
                }
                localStorage.setItem("allLines", arrLines);
                $(".endlines").append(arrLines)
            });
            var data = "act=zhans";
            $.getJSON("newway.php", data,
            function(json) {
                var arrZhans = "";
                for (var Zhans in json) {
                    arrZhans += Zhans + ":" + json[Zhans]
                }
                localStorage.setItem("localAllZhan", arrZhans)
            })
        }
    });
	//以上是起始站,终点站select模块的全部功能代码.
	//下面是通过起始站,终点站select 查询对应的站点模块,是核心功能代码.
    $(".startlines").change(function() {//用change方法
        $("#startlines .remind").remove();//把随机语录移除
        $("#startlines ul,#startlines ul li").remove();//把重复选择的站点,删除./不用这个,你选择不同线路后站点会一直叠加的.
        var localAllZhans = localStorage.getItem("localAllZhan");//get 站点了.和上面get 线路一个意思
        var selectStartZhan = ($(".startlines").children("option:selected").val());//这个很重要.就是得到选择的线路名称(一号线是1.)
        function f(a) {//这个方法是请大神写的.具体功能就是格式化你的jsop,为ul li 格式.就是把这个,格式化成
            a = a.match(/\d+:[^\d]+/g);
            var l = [];
            for (var i in a) {
                var _ = a[i].split(":");
                l[parseInt(_[0])] = _[1]
            }
            var r = $("<div></div>");
            for (var i = 0; i < l.length; i++) {
                if (!l[i]) {
                    r.append('<br style="display:none;">');
                    continue
                }
                var t = $("<ul></ul>");
                r.append(t);
                var d = l[i].split(",");
                for (var j in d) {
                    t.append("<li>" + d[j] + "</li>")
                }
            }
            return r.children()
        }
        $("#startlines").append(f(localAllZhans)[selectStartZhan]);//这个就是append看到没?就是selectStartZhan(1号线)
        $("#startlines li").click(function() {
            $("#startlines li").removeClass("click");
            $(this).addClass("click");
            startZhan = $(this).text();
            clearTimeout(querylines);
            if (endZhan == undefined) {
                $(".resultsbar .title").html("\u8bf7\u9009\u62e9\u7ec8\u70b9\u7ad9\uff01")
            } else {
                querylines = setTimeout(function() {
                    $.ajax({
                        async: false,
                        type: "GET",
                        data: {
                            startZhan: startZhan,
                            endZhan: endZhan
                        },
                        url: "newway.php?from=" + startZhan + "&to=" + endZhan + "&act=dist",
                        dataType: "json",
                        success: function(retdata, strStatus) {
                            if (retdata.err == 0) {
                                var yearly = (retdata.jine - 2) * 2 * 264;
                                var monthly = (retdata.jine - 2) * 2 * 20;
                                var unmonth = 0;
                                $(".resultsbar .title").html("\u5355\u7a0b<span>" + retdata.dist + "</span>\u516c\u91cc\uff0c\u7968\u4ef7<span>" + retdata.jine + "</span>\u5143\uff01<br/>\u6bcf\u56db\u5468\u6210\u672c\u5c06\u589e\u52a0<span>" + monthly + "</span>\u5143\uff01\u4f18\u60e0<span class='preferential'>" + unmonth + "</span>\u5143\uff01<br/>\u6bcf\u5e74\u6210\u672c\u5c06\u589e\u52a0<span>" + yearly + "</span>\u5143\uff01")
                            } else {
                                $(".resultsbar .title").html(retdata.err_msg)
                            }
                        },
                        complete: function(XMLHttpRequest, strStatus) {
                            $(".resultsbar .loading").empty()
                        },
                        cache: false
                    })
                },
                1000)
            }
        })
    });
    $(".endlines").change(function() {
        $("#endlines .remind").remove();
        $("#endlines ul,#endlines ul li").remove();
        var localAllZhans = localStorage.getItem("localAllZhan");
        var selectEndZhan = ($(".endlines").children("option:selected").val());
        function f(a) {
            a = a.match(/\d+:[^\d]+/g);
            var l = [];
            for (var i in a) {
                var _ = a[i].split(":");
                l[parseInt(_[0])] = _[1]
            }
            var r = $("<div></div>");
            for (var i = 0; i < l.length; i++) {
                if (!l[i]) {
                    r.append('<br style="display:none;">');
                    continue
                }
                var t = $("<ul></ul>");
                r.append(t);
                var d = l[i].split(",");
                for (var j in d) {
                    t.append("<li>" + d[j] + "</li>")
                }
            }
            return r.children()
        }
        $("#endlines").append(f(localAllZhans)[selectEndZhan]);
        $("#endlines li").click(function() {
            $("#endlines li").removeClass("click");
            $(this).addClass("click");
            endZhan = $(this).text();
            clearTimeout(querylines);
            if (startZhan == undefined) {
                $(".resultsbar .title").html("\u8bf7\u9009\u62e9\u8d77\u59cb\u7ad9\uff01")
            } else {
                querylines = setTimeout(function() {
                    $.ajax({
                        async: false,
                        type: "GET",
                        data: {
                            startZhan: startZhan,
                            endZhan: endZhan
                        },
                        url: "newway.php?from=" + startZhan + "&to=" + endZhan + "&act=dist",
                        dataType: "json",
                        success: function(retdata, strStatus) {
                            if (retdata.err == 0) {
                                var yearly = (retdata.jine - 2) * 2 * 264;
                                var monthly = (retdata.jine - 2) * 2 * 20;
                                var unmonth = 0;
                                $(".resultsbar .title").html("\u5355\u7a0b<span>" + retdata.dist + "</span>\u516c\u91cc\uff0c\u7968\u4ef7<span>" + retdata.jine + "</span>\u5143\uff01<br/>\u6bcf\u56db\u5468\u6210\u672c\u5c06\u589e\u52a0<span>" + monthly + "</span>\u5143\uff01\u4f18\u60e0<span class='preferential'>" + unmonth + "</span>\u5143\uff01<br/>\u6bcf\u5e74\u6210\u672c\u5c06\u589e\u52a0<span>" + yearly + "</span>\u5143\uff01")
                            } else {
                                $(".resultsbar .title").html(retdata.err_msg)
                            }
                        },
                        complete: function(XMLHttpRequest, strStatus) {
                            $(".resultsbar .loading").empty()
                        },
                        cache: false
                    })
                },
                1000)
            }
        })
    })
});