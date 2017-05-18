function GetSlideDirection(startX, startY, endX, endY, move){
	var dy = startY - endY;
 	var dx = endX - startX;
	var result;
  	//如果滑动距离太短
  	if (Math.abs(dx) < move && Math.abs(dy) < move) {
    	return 
    }
    var angle = Math.atan2(dy,dx) * 180 / Math.PI; // 获取角度
    if (angle >= -45 && angle < 30) {
        result = 'swiperRight';		// 右
    }else if (angle >= 45 && angle < 135) {
        result = 'swiperUp';		// 上
    }else if (angle >= -135 && angle < -45) {
        result = 'swiperDown';		// 下
    }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 'swiperLeft';		// 左
    }
    return result;
}

export function swiperDirective(el,direction,vm){
	if(!el || !direction ){
		return
	}
	var directionResult; // 结果

	var startX, startY;
    el.addEventListener('touchstart', function (ev){
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY; 
    }, false);

    el.addEventListener('touchmove', function (ev){
	    var endX, endY;
	    endX = ev.changedTouches[0].pageX;
	    endY = ev.changedTouches[0].pageY;
	    directionResult = GetSlideDirection(startX, startY, endX, endY, 50);
  	}, false);
  	
  	el.addEventListener('touchend', function (ev){
	    if( direction == directionResult ){
	    	vm.$router.go(-1);
	    }
  	}, false);
}