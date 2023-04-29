# Instructions

1. Create a NextJS basic project following this tutorial: NextJS - getting started.
2. Create a git repository with the code and upload it to Github, Gitlab, or Bitbucket. 
3. In the repository, create a new branch.
4. In the new branch, implement a simple exchange rate calculator, with the following characteristics:
   4.1 - An input field for the user to enter the amount to be converted.
   4.2 - Two dropdown menus for the user to select the currencies (from and to). You can obtain the list of available currencies from the API https://exchangeratesapi.io/.
   4.3 - A button to trigger the conversion.
   4.4 - An area to display the converted amount and exchange rate.
   ### IMPORTANT: Obtain the list of available currencies as well as the exchange rates using the following API: https://exchangeratesapi.io/. The API provides 250 free requests per month; you just need to obtain an API key.

5. Write at least one unit test. More unit tests, as well as snapshot tests, will give you bonus points.
6. Create a Pull Request (or Merge Request) of the new branch with a detailed description of the changes made.
7. Deploy the project to Vercel: See Introduction to Vercel | Vercel Docs.
8. 8. After completing the test and deploying the application, send us an email with the following links:
    - The link to the PR in your repository.
    - The link to the deployed version on [Vercel](https://vercel.com/).

**Bonus points:** Implement a caching mechanism for the fetched exchange rates. For this, assume that the list of available currencies doesn’t change very often and that the exchange rate between two currencies has a validity of ten minutes.
(Implemente un mecanismo de almacenamiento en caché para los tipos de cambio obtenidos. Para ello, suponga que la lista de monedas disponibles no cambia muy a menudo y que el tipo de cambio entre dos monedas tiene una validez de diez minutos.)

**Bonus points:** Use TypeScript.

**Bonus points:** Use styled-components