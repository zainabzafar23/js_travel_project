//recommendation result
// document.addEventListener('DOMContentLoaded', function(){
//     fetch('travel_recommendation_api.json')
//     .then(response=> response.json())
//     .then(data=>{
//         console.log(data);

//         const resultsContainer=document.getElementById('recommendations');

//         function createRecommendationCard(name, imageUrl, description){
//             const recommendationDiv=document.createElement('div');
//             recommendationDiv.className='recommendations';

//             const image=document.createElement('img');
//             image.src=imageUrl;
//             image.alt=name;

//             const title=document.createElement('h3');
//             title.textContent=name;

//             const desc=document.createElement('p');
//             desc.textContent=description;

//             recommendationDiv.appendChild(image);
//             recommendationDiv.appendChild(title);
//             recommendationDiv.appendChild(desc);

//             resultsContainer.appendChild(recommendationDiv);
//         }

//         data.countries.forEach(country => {
//             country.cities.forEach(city=>{
//                 createRecommendationCard(city.name, city.imageUrl,city.description);

//             });   
//         });

//         data.temples.forEach(temple=>{
//             createRecommendationCard(temple.name, temple.imageUrl, temple.description);
//     });

//     data.beaches.forEach(beach=> {
//         createRecommendationCard(beach.name, beach.imageUrl, beach.description);

//     });
//     })


//     .catch (error =>{
//         console.log('error fetching data', error);
//     });

// });




//search functionality based on key word
document.addEventListener('DOMContentLoaded', function(){

    fetch('travel_recommendation_api.json')
    .then(response=>response.json())
    .then(data=>{
        console.log(data);

        const searchBtn=document.getElementById('search');
        const searchInput=document.getElementById('search-input');
        const resultsContainer=document.getElementById('recommendations');
        const clearButton=document.getElementById('reset');

        function createRecommendationCard(name,imageUrl,description){
            const recommendationDiv = document.createElement('div');
                recommendationDiv.className = 'recommendation';

                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = name;

                const title = document.createElement('h3');
                title.textContent = name;

                const desc = document.createElement('p');
                desc.textContent = description;

                recommendationDiv.appendChild(image);
                recommendationDiv.appendChild(title);
                recommendationDiv.appendChild(desc);

                return recommendationDiv;
            }

            function displayResults(results){
                resultsContainer.innerHTML='';
                results.forEach(result=>{
                    resultsContainer.appendChild(createRecommendationCard(result.name, result.imageUrl, result.description));
                });
            }

            function searchRecommendations(keyword){
                keyword=keyword.toLowerCase();

                resultsContainer.innerHTML='';

                let results=[];
                const MAX_RESULTS=2;

            if(keyword.includes('country')){
                data.countries.forEach(country=>{
                    country.cities.slice(0,MAX_RESULTS).forEach(city=>{
                        if(city.name.toLowerCase().inlcludes(keyword)||city.description.toLowerCase().includes(keyword)){
                            results.push(city);
                        }
                    });
                });
            }

            if(keyword.includes('temple')){
                data.temples.forEach(temple=>{
                    if(temple.name.toLowerCase().includes(keyword)||temple.description.toLowerCase().includes(keyword)){
                        results.push(temple);
                    }
                });
            }

            if(keyword.includes('beach')){
                data.beaches.forEach(beach=>{
                    if(beach.name.toLowerCase().includes(keyword)||beach.description.toLowerCase().includes(keyword)){
                        results.push(beach);
                    }
                });
            }

                displayResults(results);

            }

            searchBtn.addEventListener('click',function(){
                const keyword=searchInput.value.trim();
                if(keyword){
                    searchRecommendations(keyword);
                }
            });

            clearButton.addEventListener('click',function(){
                searchInput.value='';
                resultsContainer.innerHTML='';
            });

        })

        .catch(error=>{
            console.log('error fetching data: ',error);
        });

});