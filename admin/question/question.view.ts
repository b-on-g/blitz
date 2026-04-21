namespace $.$$ {
	export class $bog_blitz_admin_question extends $.$bog_blitz_admin_question {
		@$mol_mem
		image_section_content() {
			if (this.question_image_uri()) {
				return [
					this.Image_preview(),
					this.Image_replace(),
					this.Image_url_input(),
					this.Image_url_import(),
					this.Image_remove(),
				]
			}
			return [
				this.Image_upload(),
				this.Image_url_input(),
				this.Image_url_import(),
			]
		}

		@$mol_mem
		question_rows() {
			const rows = [this.Text_input(), this.Header()]

			if (this.question_type() === 'text_input') {
				rows.push(this.Correct_text_input())
			} else {
				rows.push(this.Options_section())
				rows.push(this.Add_option())
			}

			rows.push(this.Image_section())

			return rows
		}
	}
}
