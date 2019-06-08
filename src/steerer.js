const MAX_VELOCITY = 2.5;
const MIN_VELOCITY = -2.5;

const UP = "up";
const DOWN = "down";
const LEFT = "left";
const RIGHT = "right";

const KEY_UP = "keyup";
const KEY_DOWN = "keydown";
//velocity calculated from
//https://www.reddit.com/r/TagPro/comments/4gzg88/tagpro_max_speed_question/
//https://gist.github.com/SomeBall-1/5e48d74a8aba2f20aa7137475f00c89f#file-tagpro-pos-vel-predictor-js
export default class Steerer {
	constructor(socket) {
		this.socket = socket;
		this.accel = {
			left: false,
			right: false,
			up: false,
			down: false
		};
		this.step = (1.0 / 60); //60 fps
		this.damping = 0.5;
		// Scale between Box2d physics and tagpro physics.
		this.scale = 100;
		// Damping factor.
		// So while our velocity increases by 0.025 every frame if an arrow key is held down,
		// it also decreases by v*0.00833 where v is your current velocity (x and y directions are handled independently).
		// linear damping in Box2D = 1-step*damp
		// velocity(i) = (velocity(i-1) + a) * d
		// //n = number of steps (time_in_sec*60)
		//a = acceleration (ball default = 0.025)
		//damp = linear damping value (ball default = 0.5)
		//
		//normal (0.025)	juke juice (0.031)	team tiles (0.037)
		this.d = 1 - (this.damping * this.step);
	}

	//todo - limit to 2.5
	//(well 2.499999 (init velocity) + .025)
	//https://www.wolframalpha.com/input/?i=v(i)+%3D+(v(i-1)+%2B+a)*d
	getNewVelocity(velocity, accel, steps) {
		return velocity*Math.pow(this.d, steps) + (accel*this.d*(Math.pow(this.d, steps)-1)) / (this.d-1);
	}

	//https://gist.github.com/SomeBall-1/5e48d74a8aba2f20aa7137475f00c89f#file-tagpro-pos-vel-predictor-js
	//https://www.wolframalpha.com/input/?i=solve((a+d+(-1+%2B+d%5En))%2F(-1+%2B+d)+%2B+d%5En+v%3Df,n)
	getNumStepsForVelocity(initialVelocity, finalVelocity, accel) {
		return (Math.log((a*this.d+finalVelocity*(this.d-1))/(accel*this.d+initialVelocity*(this.d-1)))/Math.log(this.d));
	}


	//solving for steps gives
	//n = log((d * dt * (v + a) - v) / (d * dt * (v_0 + a) - v_0)) / log(d * dt)


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