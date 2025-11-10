import axios from 'axios';

export class QuizApiService {
	private readonly BASE_URL = 'https://quizapi.io/api/v1/questions';
	private readonly API_KEY = process.env.QUIZ_API_KEY;

	async fetchQuestions(category: string, limit = 10) {
		try {
			const response = await axios.get(this.BASE_URL, {
				params: { category, limit },
				headers: {
					'X-Api-Key': this.API_KEY
				}
			});

			return response.data;
		} catch (error: any) {
			throw new Error('Failed to fetch questions from QuizAPI');
		}
	}

	async fetchCategories(): Promise<string[]> {
		const response = await axios.get('https://quizapi.io/api/v1/categories', {
			headers: { 'X-Api-Key': this.API_KEY }
		});
		return response.data;
	}
}
