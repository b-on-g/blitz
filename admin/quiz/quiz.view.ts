namespace $.$$ {
	export class $bog_blitz_admin_quiz extends $.$bog_blitz_admin_quiz {
		sub() {
			if (this.is_shared()) {
				return [
					this.Shared_badge(),
					this.Title_input(),
					this.Share(),
					this.Duplicate(),
					this.Edit(),
					this.Start(),
					this.Delete(),
				]
			}
			return [
				this.Title_input(),
				this.Share(),
				this.Edit(),
				this.Start(),
				this.Delete(),
			]
		}
	}
}
