namespace $.$$ {

	const Players_dict = $giper_baza_dict_to($bog_blitz_player)

	$mol_test({

		async 'Quiz entity stores title and settings'($) {
			const land = $giper_baza_land.make({ $ })
			const quiz = land.Data($bog_blitz_quiz)

			quiz.Title(null)!.val('Test Quiz')
			quiz.Points_base(null)!.val(100)
			quiz.Time_multiplier(null)!.val(1.5)
			quiz.Time_answer(null)!.val(10)
			quiz.Time_read(null)!.val(5)

			$mol_assert_equal(quiz.Title()!.val(), 'Test Quiz')
			$mol_assert_equal(quiz.Points_base()!.val(), 100)
			$mol_assert_equal(quiz.Time_multiplier()!.val(), 1.5)
			$mol_assert_equal(quiz.Time_answer()!.val(), 10)
		},

		async 'Session stores game state and quiz link'($) {
			const session_land = $giper_baza_land.make({ $ })
			const quiz_land = $giper_baza_land.make({ $ })

			const session = session_land.Data($bog_blitz_session)
			session.Quiz_link(null)!.val(quiz_land.link().str)
			session.Game_state(null)!.val('reading')
			session.Current_question(null)!.val(0)
			session.Round_start(null)!.val(12345)

			$mol_assert_equal(session.Game_state()!.val(), 'reading')
			$mol_assert_equal(session.Current_question()!.val(), 0)
			$mol_assert_equal(session.Quiz_link()!.val(), quiz_land.link().str)
			$mol_assert_equal(session.Round_start()!.val(), 12345)
		},

		async 'Session fields filter separates session keys from player keys'($) {
			const land = $giper_baza_land.make({ $ })

			const session = land.Data($bog_blitz_session)
			session.Game_state(null)!.val('reading')
			session.Quiz_link(null)!.val('some_link')

			const dict = land.Data(Players_dict)
			dict.key('player_lord_1', null)!.Name(null)!.val('Alice')

			const all_keys = Array.from(dict.keys() ?? []).map(k => String(k))
			const player_keys = all_keys.filter(k => !$bog_blitz_session_fields.has(k))

			$mol_assert_ok(player_keys.includes('player_lord_1'))
			for (const key of player_keys) {
				$mol_assert_not($bog_blitz_session_fields.has(key))
			}
		},

		async 'Player entity has Answer_land field'($) {
			const land = $giper_baza_land.make({ $ })
			const dict = land.Data(Players_dict)
			const player = dict.key('lord_1', null)!

			player.Name(null)!.val('Bob')
			player.Score(null)!.val(150)
			player.IsHost(null)!.val(false)
			player.Answer_land(null)!.val('answer_land_link')

			$mol_assert_equal(player.Name()!.val(), 'Bob')
			$mol_assert_equal(player.Score()!.val(), 150)
			$mol_assert_equal(player.IsHost()!.val(), false)
			$mol_assert_equal(player.Answer_land()!.val(), 'answer_land_link')
		},

		async 'Player answers entity stores answers and reactions'($) {
			const land = $giper_baza_land.make({ $ })
			const answers = land.Data($bog_blitz_player_answers)

			answers.Answer(null)!.val('1,3')
			answers.Answer_time(null)!.val(1000)
			answers.React_heart(null)!.val(5)
			answers.React_fire(null)!.val(3)
			answers.React_smile(null)!.val(0)

			$mol_assert_equal(answers.Answer()!.val(), '1,3')
			$mol_assert_equal(answers.Answer_time()!.val(), 1000)
			$mol_assert_equal(answers.React_heart()!.val(), 5)
			$mol_assert_equal(answers.React_fire()!.val(), 3)
			$mol_assert_equal(answers.React_smile()!.val(), 0)
		},

		async 'Answers key stores and parses correct answers JSON'($) {
			const land = $giper_baza_land.make({ $ })
			const key_entity = land.Data($bog_blitz_answers_key)

			const data = [
				{ type: 'choice', correct: '1,3' },
				{ type: 'text_input', correct: 'Paris, paris, Париж' },
				{ type: 'choice', correct: '0' },
			]
			key_entity.Data(null)!.val(JSON.stringify(data))

			const parsed = JSON.parse(key_entity.Data()!.val()!)
			$mol_assert_equal(parsed.length, 3)
			$mol_assert_equal(parsed[0].type, 'choice')
			$mol_assert_equal(parsed[0].correct, '1,3')
			$mol_assert_equal(parsed[1].type, 'text_input')
			$mol_assert_equal(parsed[1].correct, 'Paris, paris, Париж')
			$mol_assert_equal(parsed[2].correct, '0')
		},

		async 'Score: correct fast answer scores more than correct slow answer'($) {
			const points_base = 100
			const time_multiplier = 1.5
			const answer_duration = 10

			const fast_elapsed = 1
			const slow_elapsed = 9

			const fast_ratio = Math.max(0, 1 - fast_elapsed / answer_duration)
			const slow_ratio = Math.max(0, 1 - slow_elapsed / answer_duration)

			const fast_score = points_base * (1 + fast_ratio * time_multiplier)
			const slow_score = points_base * (1 + slow_ratio * time_multiplier)

			$mol_assert_ok(fast_score > slow_score)
			$mol_assert_ok(fast_score > points_base)
			$mol_assert_ok(slow_score > points_base)
		},

		async 'Score: wrong answer is negative'($) {
			const points_base = 100
			const time_multiplier = 1.5
			const answer_duration = 10
			const elapsed = 5

			const time_ratio = Math.max(0, 1 - elapsed / answer_duration)
			const base = points_base * (1 + time_ratio * time_multiplier)

			const correct_points = base
			const wrong_points = -base

			$mol_assert_ok(correct_points > 0)
			$mol_assert_ok(wrong_points < 0)
			$mol_assert_equal(correct_points, -wrong_points)
		},

		async 'Choice answer: order does not matter'($) {
			const correct = '0,2'
			const correct_set = new Set(correct.split(',').filter(Boolean))

			function check(answer: string) {
				const answer_set = new Set(answer.split(',').filter(Boolean))
				return correct_set.size === answer_set.size &&
					[...correct_set].every(k => answer_set.has(k))
			}

			$mol_assert_ok(check('0,2'))
			$mol_assert_ok(check('2,0'))
			$mol_assert_not(check('0'))
			$mol_assert_not(check('0,1'))
			$mol_assert_not(check('0,1,2'))
			$mol_assert_not(check(''))
		},

		async 'Text answer: case insensitive with variants'($) {
			const correct_text = 'Paris, paris, Париж'
			const variants = correct_text.split(',').map(v => v.trim().toLowerCase())

			function check(answer: string) {
				return variants.includes(answer.trim().toLowerCase())
			}

			$mol_assert_ok(check('Paris'))
			$mol_assert_ok(check('paris'))
			$mol_assert_ok(check('PARIS'))
			$mol_assert_ok(check('Париж'))
			$mol_assert_ok(check(' paris '))
			$mol_assert_not(check('London'))
			$mol_assert_not(check(''))
		},

		async 'Multi_correct flag from answer key'($) {
			const keys: { type: string; correct: string }[] = [
				{ type: 'choice', correct: '1,3' },
				{ type: 'choice', correct: '0' },
				{ type: 'text_input', correct: 'Paris' },
			]

			function is_multi(key: { type: string; correct: string }) {
				return key.type !== 'text_input' && key.correct.split(',').length >= 2
			}

			$mol_assert_ok(is_multi(keys[0]))
			$mol_assert_not(is_multi(keys[1]))
			$mol_assert_not(is_multi(keys[2]))
		},

		async 'Game state transitions stored in session'($) {
			const land = $giper_baza_land.make({ $ })
			const session = land.Data($bog_blitz_session)

			session.Game_state(null)!.val('reading')
			session.Current_question(null)!.val(0)
			$mol_assert_equal(session.Game_state()!.val(), 'reading')

			session.Game_state(null)!.val('answering')
			session.Round_start(null)!.val(1000)
			$mol_assert_equal(session.Game_state()!.val(), 'answering')

			session.Game_state(null)!.val('reveal')
			$mol_assert_equal(session.Game_state()!.val(), 'reveal')

			session.Game_state(null)!.val('leaderboard')
			$mol_assert_equal(session.Game_state()!.val(), 'leaderboard')

			session.Current_question(null)!.val(1)
			session.Game_state(null)!.val('reading')
			$mol_assert_equal(session.Current_question()!.val(), 1)
			$mol_assert_equal(session.Game_state()!.val(), 'reading')

			session.Game_state(null)!.val('final')
			$mol_assert_equal(session.Game_state()!.val(), 'final')
		},

		async 'Pause stores timestamp, resume clears it'($) {
			const land = $giper_baza_land.make({ $ })
			const session = land.Data($bog_blitz_session)

			session.Round_start(null)!.val(1000)
			session.Paused_at(null)!.val(0)
			$mol_assert_equal(session.Paused_at()!.val(), 0)

			session.Paused_at(null)!.val(1500)
			$mol_assert_ok(session.Paused_at()!.val()! > 0)

			// Resume: shift round_start and clear paused_at
			const pause_duration = 500
			session.Round_start(null)!.val(1000 + pause_duration)
			session.Paused_at(null)!.val(0)
			$mol_assert_equal(session.Paused_at()!.val(), 0)
			$mol_assert_equal(session.Round_start()!.val(), 1500)
		},

		async 'Reveal_correct published to session'($) {
			const land = $giper_baza_land.make({ $ })
			const session = land.Data($bog_blitz_session)

			session.Reveal_correct(null)!.val('')
			$mol_assert_equal(session.Reveal_correct()!.val(), '')

			// Host publishes correct indices during reveal
			session.Reveal_correct(null)!.val('0,2')
			$mol_assert_equal(session.Reveal_correct()!.val(), '0,2')

			// Cleared on next question
			session.Reveal_correct(null)!.val('')
			$mol_assert_equal(session.Reveal_correct()!.val(), '')
		},

		async 'Home ref stores quizzes land link'($) {
			const land = $giper_baza_land.make({ $ })
			const ref = land.Data($bog_blitz_home_ref)

			$mol_assert_equal(ref.Quizzes_land()?.val() ?? null, null)

			ref.Quizzes_land(null)!.val('quizzes_land_link')
			$mol_assert_equal(ref.Quizzes_land()!.val(), 'quizzes_land_link')
		},

		async 'Multiple players in session land'($) {
			const land = $giper_baza_land.make({ $ })
			const dict = land.Data(Players_dict)

			const host = dict.key('host_lord', null)!
			host.Name(null)!.val('Host')
			host.IsHost(null)!.val(true)

			const p1 = dict.key('player_1', null)!
			p1.Name(null)!.val('Alice')
			p1.Score(null)!.val(200)

			const p2 = dict.key('player_2', null)!
			p2.Name(null)!.val('Bob')
			p2.Score(null)!.val(150)

			const all_keys = Array.from(dict.keys() ?? []).map(k => String(k))
			$mol_assert_ok(all_keys.includes('host_lord'))
			$mol_assert_ok(all_keys.includes('player_1'))
			$mol_assert_ok(all_keys.includes('player_2'))

			// Read back via same refs
			$mol_assert_ok(host.IsHost()!.val())
			$mol_assert_equal(p1.Name()!.val(), 'Alice')
			$mol_assert_equal(p1.Score()!.val(), 200)
			$mol_assert_equal(p2.Name()!.val(), 'Bob')
			$mol_assert_equal(p2.Score()!.val(), 150)
		},

	})
}
