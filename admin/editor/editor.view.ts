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
			const q = this.questions()[Number(key)]
			if (!q) return []
			const options = q.Options()?.remote_list() ?? []
			return options.map((_: string, i: number) => this.Option(`${key}_${i}`))
		}

		@$mol_action
		add_option(key: string) {
			const q = this.questions()[Number(key)]
			if (!q) return
			q.Options('auto')!.make(null)
		}

		@$mol_action
		delete_option(key: string) {
			const [qKey, oKey] = key.split('_')
			const q = this.questions()[Number(qKey)]
			if (!q) return
			const opt = (q.Options()?.remote_list() ?? [])[Number(oKey)]
			if (!opt) return
			q.Options('auto')!.cut(opt.link())
		}

		@$mol_mem_key
		option_text(key: string, next?: string) {
			const [qKey, oKey] = key.split('_')
			const q = this.questions()[Number(qKey)]
			if (!q) return ''
			const opt = (q.Options()?.remote_list() ?? [])[Number(oKey)]
			if (!opt) return ''
			if (next !== undefined) {
				opt.Text('auto')?.val(next)
				return next
			}
			return opt.Text()?.val() ?? ''
		}

		@$mol_mem_key
		is_correct(key: string, next?: boolean) {
			const [qKey, oKey] = key.split('_')
			const q = this.questions()[Number(qKey)]
			if (!q) return false
			const opt = (q.Options()?.remote_list() ?? [])[Number(oKey)]
			if (!opt) return false
			if (next !== undefined) {
				opt.Is_correct('auto')?.val(next)
				return next
			}
			return opt.Is_correct()?.val() ?? false
		}
		@$mol_mem_key
		correct_text(key: string, next?: string) {
			const q = this.questions()[Number(key)]
			if (!q) return ''
			if (next !== undefined) {
				q.Correct_text('auto')?.val(next)
				return next
			}
			return q.Correct_text()?.val() ?? ''
		}

		@$mol_mem_key
		question_image_uri(key: string) {
			const q = this.questions()[Number(key)]
			if (!q) return ''
			const file = q.Image()?.remote()
			if (!file) return ''
			return URL.createObjectURL(file.blob())
		}

		@$mol_mem_key
		question_image_files(key: string, next?: readonly File[]) {
			if (next?.length) {
				const q = this.questions()[Number(key)]
				if (q) {
					const store = q.Image('auto')!.ensure(null)
					if (store) {
						store.blob(next[0])
					}
				}
			}
			return next ?? []
		}
	}
}
