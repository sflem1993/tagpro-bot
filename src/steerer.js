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
		this.accelUp = false;
		this.accelDown = false;
		this.accelLeft = false;
		this.accelRight = false;
		this.step = (1.0 / 60.0); //60 fps
		this.damping = 0.5;
		this.d = 1 - (this.damping * this.step);
	}

	/*
		TODO - ALLOW SCENARIO WHERE both are deaccel -now, we only "switch" when we physically pass the point,
		which means our momentum makes us swing wildly back and forth
	*/
	steer() {
		if (this.accelUp) {
			this.pressUpArrow();
		} else {
			this.releaseUpArrow();
		}

		if (this.accelDown) {
			this.pressDownArrow();
		} else {
			this.releaseDownArrow();
		}

		if (this.accelLeft) {
			this.pressLeftArrow();
		} else {
			this.releaseLeftArrow();
		}

		if (this.accelRight) {
			this.pressRightArrow();
		} else {
			this.releaseRightArrow();
		}
	}

	determineAccelDirections(path, nextTile, futureTile, playerTile, playerPhysics) {
		this.accelUp = false;
		this.accelDown = false;
		this.accelLeft = false;
		this.accelRight = false;

		let goUp = false;
		let goDown = false;
		let goLeft = false;
		let goRight = false;

		if (playerPhysics.x < nextTile.x*40) {
			goRight = true;
			goLeft = false;
		} else {
			goRight = false;
			goLeft = true;
		}

		if (playerPhysics.y < nextTile.y*40) {
			goUp = true;
			goDown = false;
		} else {
			goUp = false;
			goDown = true;
		}



		let xDiff = Math.abs(futureTile.x-playerTile.x);
		let yDiff = Math.abs(futureTile.y-playerTile.y);
		if (yDiff <= 1 || path.length<=2) {
			if (playerPhysics.velocityY > 0.0) {
				this.accelUp = false;
				this.accelDown = true;
			} else if (playerPhysics.velocityY < 0) {
				this.accelUp = true;
				this.accelDown = false;
			}
		} else if (goUp) {
			this.accelUp = true;
			this.accelDown = false;
		} else if (goDown){//} && playerPhysics.velocityY > -1.0) {
			this.accelUp = false;
			this.accelDown = true;
		}

		if (xDiff <= 1 || path.length<=2) {
			if (playerPhysics.velocityX > 0.0) {
				this.accelLeft = true;
				this.accelRight = false;
			} else {
				this.accelLeft = false;
				this.accelRight = true;
			}
		} else if (goRight){//} && playerPhysics.velocityX < 2.0){
			this.accelRight = true;
			this.accelLeft = false;
		} else if (goLeft){//} && playerPhysics.velocityX > -2.0){
			this.accelLeft = true;
			this.accelRight = false;
		}
		this.printAccels();
	}

	printAccels() {
		let accels = {up: this.accelUp, down: this.accelDown, lefT: this.accelLeft, right: this.accelRight};
		console.log("accelsss ", accels);
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

	pressUpArrow() {
		this.tagpro.sendKeyPress(UP, true);
	}

	pressDownArrow() {
		this.tagpro.sendKeyPress(DOWN, true);
	}

	releaseUpArrow() {
		this.tagpro.sendKeyPress(UP, false);
	}

	releaseDownArrow() {
		this.tagpro.sendKeyPress(DOWN, false);
	}

	//for whatever reason, left and right are 'reverse' in the needed keypress when compared to up/down
	pressLeftArrow() {
		this.tagpro.sendKeyPress(LEFT, false);
	}

	pressRightArrow() {
		this.tagpro.sendKeyPress(RIGHT, false);
	}

	releaseLeftArrow() {
		this.tagpro.sendKeyPress(LEFT, true);
	}

	releaseRightArrow() {
		this.tagpro.sendKeyPress(RIGHT, true);
	}
}