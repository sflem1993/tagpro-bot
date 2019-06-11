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
	constructor(tagpro) {
		this.tagpro = tagpro;
		this.accelX = false;
		this.accelY = false;
		this.step = (1.0 / 60.0); //60 fps
		this.damping = 0.5;
		this.d = 1 - (this.damping * this.step);
	}

	steer() {
		console.log("accel x is ", this.accelX);
		console.log("accel y is ", this.accelY);
		if (this.accelX) {
			this.deAccelRight();
			this.accelLeft();
		} else {
			this.deAccelLeft();
			this.accelRight();
		}

		if (this.accelY) {
			this.deAccelDown();
			this.accelUp();
		} else {
			this.deAccelUp();
			this.accelDown();
		}
	}

	//todo - limit to 2.5
	//(well 2.499999 (init velocity) + .025)
	//https://www.wolframalpha.com/input/?i=v(i)+%3D+(v(i-1)+%2B+a)*d
	getNewVelocity(velocity, accel, steps) {
		return velocity*Math.pow(this.d, steps) + (accel*this.d*(Math.pow(this.d, steps)-1)) / (this.d-1);
	}

	//https://www.wolframalpha.com/input/?i=solve((a+d+(-1+%2B+d%5En))%2F(-1+%2B+d)+%2B+d%5En+v%3Df,n)
	////will use to predict if safe to cap/etc
	getNumStepsForVelocity(initialVelocity, finalVelocity, accel) {
		return (Math.log((a*this.d+finalVelocity*(this.d-1))/(accel*this.d+initialVelocity*(this.d-1)))/Math.log(this.d));
	}

	accelInDirection(direction) {
		console.log("TRUE ", direction);
		this.tagpro.sendKeyPress(direction, true);
	}

	deAccelInDirection(direction) {
		console.log("FALSE ", direction);
		this.tagpro.sendKeyPress(direction, false);
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

	deAccelDown() {
		this.deAccelInDirection(DOWN);
	}

	deAccelLeft() {
		this.deAccelInDirection(LEFT);
	}

	deAccelRight() {
		this.deAccelInDirection(RIGHT);
	}
}