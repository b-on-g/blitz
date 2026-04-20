namespace $.$$ {
	export class $bog_blitz_review_card extends $.$bog_blitz_review_card {
		sub() {
			const items: any[] = [this.Header(), this.Text_body()]
			if (this.has_reply()) items.push(this.Reply_wrap())
			if (this.can_reply()) {
				if (this.reply_form_open()) items.push(this.Reply_form())
				items.push(this.Reply_toggle())
			}
			return items
		}
	}
}
