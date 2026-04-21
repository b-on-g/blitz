namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game, {
		flex: {
			direction: 'column',
		},
		align: { items: 'center' },
		padding: { top: '0px' },
		Host_controls: {
			padding: { top: '0.5rem', bottom: '0.5rem' },
		},
		State: {
			font: { size: '1.5rem', weight: 600 },
			opacity: 0.5,
		},
		Question_image: {
			maxWidth: '20rem',
			maxHeight: '15rem',
			objectFit: 'contain',
			borderRadius: '0.75rem',
			margin: { top: '1rem' },
		},
		Question_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			justify: { content: 'center' },
			gap: '1rem',
			width: '100%',
			maxWidth: '40rem',
			padding: { top: '1rem', bottom: '1.5rem', left: '1rem', right: '1rem' },
		},
		Question: {
			flex: { grow: 1 },
			font: { size: '1.75rem', weight: 700 },
			textAlign: 'center',
		},
		Answer_area: {
			flex: { direction: 'column' },
			gap: '0.75rem',
			width: '100%',
			maxWidth: '30rem',
			padding: { left: '1rem', right: '1rem', bottom: '4rem' },
		},
		Answer_input: {
			width: '100%',
		},
		Countdown: {
			position: 'fixed',
			top: '20%',
			left: 0,
			right: 0,
			height: '60%',
			display: 'flex',
			align: { items: 'center' },
			justify: { content: 'center' },
			pointerEvents: 'none',
		},
		Countdown_number: {
			font: { size: '15rem', weight: 900 },
			opacity: 0.15,
		},
		'@media': {
			'(width < 600px)': {
				Question_row: {
					flex: { direction: 'column' },
					gap: '0.5rem',
					padding: { top: '0.5rem', bottom: '0.75rem', left: '0.5rem', right: '0.5rem' },
				},
				Question: {
					font: { size: '1.25rem', weight: 700 },
				},
				Question_image: {
					maxWidth: '100%',
					maxHeight: '10rem',
					margin: { top: '0.5rem' },
				},
				Answer_area: {
					gap: '0.5rem',
					padding: { left: '0.5rem', right: '0.5rem' },
				},
				Countdown_number: {
					font: { size: '8rem', weight: 900 },
				},
			},
		},
	})
}
