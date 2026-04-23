namespace $.$$ {

	function compress_image(file: File, max_size = 400, quality = 0.3): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const img = new Image()
			img.onload = () => {
				let { width, height } = img
				if (width > max_size || height > max_size) {
					const ratio = Math.min(max_size / width, max_size / height)
					width = Math.round(width * ratio)
					height = Math.round(height * ratio)
				}
				const canvas = document.createElement('canvas')
				canvas.width = width
				canvas.height = height
				canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
				canvas.toBlob(
					blob => blob ? resolve(blob) : reject(new Error('compress failed')),
					'image/jpeg',
					quality,
				)
			}
			img.onerror = reject
			img.src = URL.createObjectURL(file)
		})
	}

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
			const rows: any[] = [this.Title_input(), this.Settings()]
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
					const store = q.Image(null)!.ensure(null)
					if (store) {
						compress_image(next[0]).then(blob => {
							store.blob(blob)
							q.Image(null)!.remote(store)
						})
					}
				}
			}
			return next ?? []
		}

		@$mol_mem_key
		option_image_uri(key: string) {
			const [qKey, oKey] = key.split('_')
			const q = this.questions()[Number(qKey)]
			if (!q) return ''
			const opt = (q.Options()?.remote_list() ?? [])[Number(oKey)]
			if (!opt) return ''
			const file = opt.Image()?.remote()
			if (!file) return ''
			return URL.createObjectURL(file.blob())
		}

		@$mol_mem_key
		option_image_files(key: string, next?: readonly File[]) {
			if (next?.length) {
				const [qKey, oKey] = key.split('_')
				const q = this.questions()[Number(qKey)]
				if (!q) return next ?? []
				const opt = (q.Options()?.remote_list() ?? [])[Number(oKey)]
				if (opt) {
					const store = opt.Image(null)!.ensure(null)
					if (store) {
						compress_image(next[0]).then(blob => {
							store.blob(blob)
							opt.Image(null)!.remote(store)
						})
					}
				}
			}
			return next ?? []
		}

		@$mol_action
		remove_question_image(key: string) {
			const q = this.questions()[Number(key)]
			if (!q) return
			q.Image('auto')?.val(null)
		}

		@$mol_action
		remove_option_image(key: string) {
			const [qKey, oKey] = key.split('_')
			const q = this.questions()[Number(qKey)]
			if (!q) return
			const opt = (q.Options()?.remote_list() ?? [])[Number(oKey)]
			if (!opt) return
			opt.Image('auto')?.val(null)
		}

		@$mol_mem
		manual_mode(next?: boolean) {
			const quiz = this.quiz_data()
			if (!quiz) return false
			if (next !== undefined) {
				quiz.Manual_mode('auto')?.val(next)
				return next
			}
			return quiz.Manual_mode()?.val() ?? false
		}

		@$mol_mem
		time_read(next?: number) {
			const quiz = this.quiz_data()
			if (!quiz) return 5
			if (next !== undefined) {
				quiz.Time_read('auto')?.val(next)
				return next
			}
			return quiz.Time_read()?.val() ?? 5
		}

		@$mol_mem
		time_answer(next?: number) {
			const quiz = this.quiz_data()
			if (!quiz) return 10
			if (next !== undefined) {
				quiz.Time_answer('auto')?.val(next)
				return next
			}
			return quiz.Time_answer()?.val() ?? 10
		}

		@$mol_mem
		time_reveal(next?: number) {
			const quiz = this.quiz_data()
			if (!quiz) return 5
			if (next !== undefined) {
				quiz.Time_reveal('auto')?.val(next)
				return next
			}
			return quiz.Time_reveal()?.val() ?? 5
		}

		@$mol_mem
		time_leaderboard(next?: number) {
			const quiz = this.quiz_data()
			if (!quiz) return 10
			if (next !== undefined) {
				quiz.Time_leaderboard('auto')?.val(next)
				return next
			}
			return quiz.Time_leaderboard()?.val() ?? 10
		}

		@$mol_mem
		points_base(next?: number) {
			const quiz = this.quiz_data()
			if (!quiz) return 100
			if (next !== undefined) {
				quiz.Points_base('auto')?.val(next)
				return next
			}
			return quiz.Points_base()?.val() ?? 100
		}

		@$mol_mem
		time_multiplier(next?: number) {
			const quiz = this.quiz_data()
			if (!quiz) return 1.5
			if (next !== undefined) {
				quiz.Time_multiplier('auto')?.val(next)
				return next
			}
			return quiz.Time_multiplier()?.val() ?? 1.5
		}
	}
}
