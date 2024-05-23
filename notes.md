            2 DOM in web'
Real DOM                    Virtual DOM
//react is client based not server based

## react Hook
    web hook 
    state hook

## Component life cycle
    3 phases
        a. Mounting(loading)
            ---> first time render
            ---> network call
            ---> state change
                --> render
            --->
            constructor()
            render()
            componenytDidMount()
        
        b. Updating(Update)
            ---> render()
            ---> componentDidUpdate()

        c. Unmounting(change of component)
            ---> componentWillUnmount()
    constructor-->render--->component will mount--->render--->component did update

Hook in fucntional based component
## Hook function
    ---> always begins with 'use' keyword
    ---> Hooks are always called in top level
    --->features
       { -state hook
            -useSate()
        -effect hook
            -useEffect()} yo duita bujera aunu
        -performance hook
            -useMemo(),useCalback(),lazy
        - Reference Hook
            -use Ref
        - Dispatch
            -useDispath(),useContext()
        -custom hook

---> Hooks allows use of specific features


## axios
    ## XHR Request
        -axios,fetch,superagent,
        -XMLHTTPRequest

        -Rest api
            -CRUD 
                Create
                    -post
                Read
                    -get
                Update
                    -put/patch
                Delete
                    -delete
        -Soap api
        -Graph api
        
## fetch
    --node default package


    API Documentation
        -Postman collection, Swagger Documentation
        -Documentation,readme file on github

    EULA-END USER LISCENCE AGREEMENT

    UI Component-->module.service.js--->axios.serice.js-->axios.config.jsx--> Api server call


## Redux
    UI=> Action Triggeer(Reducer)=>Manipulation(Event manage and state maintain)===>Store Update >>>>Listener components


## Responsiveness

    sm, md, lg, xl, xxl
    container
    row col
    col-sm
    col-md
    col-lg
    col-xl