namespace $.$$ {
	export class $bog_blitz_admin_question extends $.$bog_blitz_admin_question {
		@$mol_mem
		question_rows() {
			const rows = [this.Header(), this.Text_input()]
			if (this.question_type() === 'text_input') {
				rows.push(this.Correct_text_input())
			} else {
				rows.push(this.Options_section())
				rows.push(this.Add_option())
			}
			return rows
		}
	}
}
