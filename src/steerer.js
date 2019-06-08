const MAX_VELOCITY = 2.5;
const MIN_VELOCITY = -2.5;

const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

const KEY_UP = "keyup";
const KEY_DOWN = "keydown";
/*
	velocity formulas/logic from:
		https://www.reddit.com/r/TagPro/comments/4gzg88/tagpro_max_speed_question/
		https://gist.github.com/SomeBall-1/5e48d74a8aba2f20aa7137475f00c89f#file-tagpro-pos-vel-predictor-js
*/

export default class Steerer {
	constructor(socket) {
		this.socket = socket;
		this.accel = {
			left: false,
			right: false,
			up: false,
			down: false
		};
		this.step = (1.0 / 60.0); //60 fps
		this.damping = 0.5;
		this.d = 1 - (this.damping * this.step);
	}

	//todo - limit to 2.5
	//(well 2.499999 (init velocity) + .025)
	//https://www.wolframalpha.com/input/?i=v(i)+%3D+(v(i-1)+%2B+a)*d
	getNewVelocity(velocity, accel, steps) {
		return velocity*Math.pow(this.d, steps) + (accel*this.d*(Math.pow(this.d, steps)-1)) / (this.d-1);
	}

	//https://www.wolframalpha.com/input/?i=solve((a+d+(-1+%2B+d%5En))%2F(-1+%2B+d)+%2B+d%5En+v%3Df,n)
	getNumStepsForVelocity(initialVelocity, finalVelocity, accel) {
		return (Math.log((a*this.d+finalVelocity*(this.d-1))/(accel*this.d+initialVelocity*(this.d-1)))/Math.log(this.d));
	}

	changeDirection(command, direction) {
		this.socket.emit(command, {k: direction});
	}

	accelInDirection(direction) {
		this.changeDirection(KEY_UP, direction);
		this.accel[direction] = true;
	}

	deAccelInDirection(direction) {
		this.changeDirection(KEY_DOWN, direction);
		this.accel[direction] = false;
	}

	accelUp() {
		this.accelInDirection(UP);
	}

	accelDown() {
		this.accelInDirection(DOWN);
	}

	accelLeft() {
		this.accelInDirection(LEFT);
	}

	accelRight() {
		this.accelInDirection(RIGHT);
	}

	deAccelUp() {
		this.deAccelInDirection(UP);
	}

	deAcelDown() {
		this.deAccelInDirection(DOWN);
	}

	deAccelLeft() {
		this.deAccelInDirection(LEFT);
	}

	deAccelRight() {
		this.deAccelInDirection(RIGHT);
	}
}