# app.py
import pandas as pd
from dash import Dash, dcc, html
import plotly.express as px
import numpy as np
from dash.dependencies import Input, Output
import time
# import pymongo
#  
# import sys
# print(sys.argv[1])
# print("*888888***\n\n")
# print(sys.argv[1])
# client = pymongo.MongoClient("mongodb+srv://Deepak:hello@cluster0.7sny44u.mongodb.net/Questions?retryWrites=true&w=majority")
# print("Conn")
# db = client["Questions"]
# print("lo")

# a = db["questions"]
# print("lo;")
# print(a)

# for i in a.find({}):
#     print("loll;")
#     print(a.find_one())
#     print("loll;")
# print("loll;")
data = (
    pd.read_csv("user_data.csv")
    # .query("type == 'conventional' and region == 'Albany'")
    .assign(Date=lambda data: pd.to_datetime(data["Date"], format="%Y-%m-%d"))
    .sort_values(by="Date")
)



app = Dash(__name__)

scatter_plot = px.scatter(data, x="Date", y="Rating_change",color="Level")

levels=data.Level.unique()
level_counts=data['Level'].value_counts().to_list()

level_pie_chart =px.pie(data, values=level_counts, names=levels)


topics=data.Topic.unique()
topic_counts=data['Topic'].value_counts().to_list()

topic_pie_chart =px.pie(data, values=topic_counts, names=topics)





app.layout = html.Div(
    children=[
        html.H1(children="Coder Analytics"),
        html.P(
            children=(
                "Analysis of coder behavior"
            ),
        ),
        html.Div(className='row', children=[
        # html.Div(children=[
        #     html.H4('Analysis of the restaurant sales'),
            dcc.Graph(figure=level_pie_chart, id="level_pie_chart",style={'display': 'inline-block'}),
            # html.H4('Analysis of the restaurant sales'),
            dcc.Graph(figure=topic_pie_chart, id="topic_pie_chart",style={'display': 'inline-block'}),
            ]),
        # ]
        # ),
        # creating a dropdown within a html component
        html.Div(className='row', children=[
        html.H4('Plot of the progress'),
        html.Div( id = 'dropdown-div', children = 
                    [dcc.Dropdown(id = 'continent-dropdown',
                    options = [{'label':i, 'value':i} for i in np.append(['All'],data['Level'].unique()) ],
                    value = 'All'
                    )], style = {'width':'40%', 'verticalAlign':"middle"} ),
        html.Div([
        dcc.Graph(
                figure=scatter_plot, id="scatter-plot",
            ),
        ])
        ])
    ]
)
@app.callback(Output(component_id='scatter-plot', component_property= 'figure'),
            #   [Input(component_id='year-slider', component_property= 'value'),
               [Input(component_id='continent-dropdown', component_property= 'value')])
def graph_update(level):
    # filtering based on the slide and dropdown selection
    if level == 'All':
        filtered_df = data
    else:
        filtered_df = data.loc[(data['Level'] == level)]
    
    # the figure/plot created using the data filtered above 
    fig = px.scatter(filtered_df, x="Date", y="Rating_change",color="Level",)

      
    return fig

if __name__== '__main__':
    app.run_server()
    # time.sleep(1000)


if __name__ == "__main__":
    app.run_server(debug=True)
    # time.sleep(1000)