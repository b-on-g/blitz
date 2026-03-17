namespace $.$$ {
	export class $bog_blitz_admin_editor extends $.$bog_blitz_admin_editor {
		quiz_data() {
			const land = this.quiz_land()
			if (!land) return null
			return land.Data($bog_blitz_quiz)
		}

		@$mol_mem
		questions() {
			return this.quiz_data()?.Questions()?.remote_list() ?? []
		}

		@$mol_mem
		editor_rows() {
			const quiz = this.quiz_data()
			if (!quiz) return []
			const rows: any[] = [this.Title_input()]
			const questions = this.questions()
			for (let i = 0; i < questions.length; i++) {
				rows.push(this.Question(String(i)))
			}
			rows.push(this.Add_question())
			return rows
		}

		@$mol_mem
		quiz_title(next?: string) {
			const quiz = this.quiz_data()
			if (!quiz) return ''
			if (next !== undefined) {
				quiz.Title('auto')?.val(next)
				return next
			}
			return quiz.Title()?.val() ?? ''
		}

		@$mol_mem_key
		question_number(key: string) {
			return Number(key) + 1
		}

		@$mol_mem_key
		question_text(key: string, next?: string) {
			const q = this.questions()[Number(key)]
			if (!q) return ''
			if (next !== undefined) {
				q.Text('auto')?.val(next)
				return next
			}
			return q.Text()?.val() ?? ''
		}

		@$mol_mem_key
		question_type(key: string, next?: string) {
			const q = this.questions()[Number(key)]
			if (!q) return 'choice'
			if (next !== undefined) {
				q.Type('auto')?.val(next)
				return next
			}
			return q.Type()?.val() ?? 'choice'
		}

		@$mol_action
		add_question() {
			const quiz = this.quiz_data()
			if (!quiz) return
			const questions = quiz.Questions('auto')!
			const q = questions.make(null)
			q.Type('auto')?.val('choice')
			q.Points_plus('auto')?.val(10)
			q.Points_minus('auto')?.val(0)
		}

		@$mol_action
		delete_question(key: string) {
			const quiz = this.quiz_data()
			if (!quiz) return
			const q = this.questions()[Number(key)]
			if (!q) return
			quiz.Questions('auto')!.cut(q.link())
		}

		@$mol_mem_key
		option_rows(key: string) {
			// TODO: option editing
			return [] as any[]
		}

		@$mol_action
		add_option(key: string) {
			// TODO: add option to question
		}
	}
}
