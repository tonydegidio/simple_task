/*
            You have access to two functions.

            getDatabaseContent( callbackFn );

            callbackFn should be a function with one parameter that will
            contain all of the data saved in the local storage cache

            setDatabaseContent( content, callbackFn );
            
            content is a variable that should be a new single line of content
            to save in the local storage cache.

            callbackFn will not pass any new variables, but will run 
            when saving content is complete.
        */
const formatDate = ( dateTime ) => {
    let yyyy = dateTime.getFullYear();
    let mm = dateTime.getMonth();
    let dd = dateTime.getDate();
    let hh = dateTime.getHours();
    let mi = dateTime.getMinutes();
    let ss = dateTime.getSeconds();
    mm = mm + 1;
    if( mm < 10 )
        mm = '0'+mm;
    if( dd < 10 )
        dd = '0'+dd;
    if( hh < 10 )
        hh = '0'+dd;
    if( mi < 10 )
        mi = '0'+mi;
    if( ss < 10 )
        ss = '0'+ss;
    let saveTime = yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss;
    return saveTime;
}

const getDatabaseContent = ( callbackFn ) => {

    if( typeof( callbackFn ) !== 'function' ){
        alert( 'You did not pass a valid callback function.' );
        return false;
    }
    if( window.localStorage ){
        if( window.localStorage.getItem( 'tasks' ) ){
            callbackFn( JSON.parse( window.localStorage.getItem( 'tasks' ) ) )
        }else{
            callbackFn( [] );
        }
    }else{
        console.log( 'Could not find local storage, abandoning operation' );
    }

}

const setDatabaseContent = ( content, callbackFn ) => {

    if( typeof( content ) !== 'object' ){
        alert( 'You did not pass a valid content object.' );
        return false;
    }
    if( typeof( callbackFn ) !== 'function' ){
        alert( 'You did not pass a valid callback function.' );
        return false;
    }
    getDatabaseContent( function( currentContent ) {
        currentContent.unshift( content );
        window.localStorage.setItem( 'tasks', JSON.stringify( currentContent ) );
        callbackFn();
    });

}

const clearDatabaseContent = ( callbackFn ) => {

    if( typeof( callbackFn ) !== 'function' ){
        alert( 'You did not pass a valid callback function.' );
        return false;
    }
    window.localStorage.setItem( 'tasks', JSON.stringify( [] ) );
    callbackFn();

}