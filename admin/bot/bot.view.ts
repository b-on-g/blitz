namespace $.$$ {
	export class $bog_blitz_admin_bot extends $.$bog_blitz_admin_bot {
		@$mol_mem
		override rules() {
			const base = super.rules()
			return base + `

ADDITIONAL CONTEXT: You are a quiz generator bot for Giper Blitz Quiz app.
When the user describes a topic, number of questions, or any quiz idea — generate a quiz in JSON format.
Put the quiz JSON string into the "document" field of your response.
The quiz JSON must follow this exact structure:

{
  "title": "Quiz Title",
  "time_read": 5,
  "time_answer": 10,
  "time_leaderboard": 10,
  "points_base": 100,
  "time_multiplier": 1.5,
  "questions": [
    {
      "text": "Question text?",
      "type": "choice",
      "options": [
        { "text": "Option A", "is_correct": true },
        { "text": "Option B", "is_correct": false },
        { "text": "Option C", "is_correct": false },
        { "text": "Option D", "is_correct": false }
      ]
    },
    {
      "text": "What is 2+2?",
      "type": "text_input",
      "correct_text": "4, four"
    }
  ]
}

Quiz generation rules:
- "type" is either "choice" (multiple choice with options) or "text_input" (free text answer)
- For "choice": provide 2-6 options, at least one must have "is_correct": true
- For "text_input": provide "correct_text" with comma-separated acceptable answers (case-insensitive)
- Generate interesting, varied questions
- Every quiz must have a unique title — always vary the title, even if the topic is the same
- In "message" briefly describe what you generated
- The "document" field must contain the quiz JSON as a string`
		}

		@$mol_mem
		override communication() {
			super.communication()

			const doc = this.result()
			if (!doc) return

			try {
				const data = JSON.parse(doc)
				if (data.title && Array.isArray(data.questions)) {
					this.on_quiz(doc)
				}
			} catch {}
		}
	}
}
