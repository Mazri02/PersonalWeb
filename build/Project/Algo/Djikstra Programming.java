/********Djikstra Programming***********/

import java.util.ArrayList;
class Main{
    public static void main(String[] args){
        com.company.Algo a = new com.company.Algo();
        ArrayList<com.company.Path> p = new ArrayList<>();
        //Problem 1
        System.out.println("Problem 1");
        p.add(new com.company.Path("S", new int[] {0,1,0,2,0,0}));
        p.add(new com.company.Path("A", new int[] {0,0,6,0,0,0}));
        p.add(new com.company.Path("B", new int[] {0,0,0,0,1,2}));
        p.add(new com.company.Path("C", new int[] {0,4,0,0,3,0}));
        p.add(new com.company.Path("D", new int[] {0,0,0,0,0,1}));
        p.add(new com.company.Path("E", new int[] {0,0,0,0,0,0}));

        a.initiateDjikstraProg(p,0);
        System.out.println("\n");
        p.clear();

        //Problem 2
        System.out.println("Problem 2");
        p.add(new com.company.Path("A",new int[] {0,0,0,0,7}));
        p.add(new com.company.Path("B",new int[] {4,0,0,0,0}));
        p.add(new com.company.Path("C",new int[] {0,1,0,0,0}));
        p.add(new com.company.Path("D",new int[] {0,2,6,0,0}));
        p.add(new com.company.Path("E",new int[] {0,0,0,0,0}));

        a.initiateDjikstraProg(p,3);
        System.out.println("\n");
        p.clear();

        //Problem 3
        System.out.println("Problem 3");
        p.add(new com.company.Path("A", new int[] {0,3,5,9,0,0}));
        p.add(new com.company.Path("B", new int[] {3,0,3,4,7,0}));
        p.add(new com.company.Path("C", new int[] {5,3,0,2,6,8}));
        p.add(new com.company.Path("D", new int[] {9,4,2,0,2,2}));
        p.add(new com.company.Path("E", new int[] {0,7,6,2,0,5}));
        p.add(new com.company.Path("F", new int[] {0,0,8,2,5,0}));

        a.initiateDjikstraProg(p,0);
        System.out.println("\n");
        p.clear();

        //Problem 4
        System.out.println("Problem 4");
        p.add(new com.company.Path("A", new int[] {0,3,5,0,0}));
        p.add(new com.company.Path("B", new int[] {0,0,2,6,0}));
        p.add(new com.company.Path("C", new int[] {0,1,0,4,6}));
        p.add(new com.company.Path("D", new int[] {0,0,0,0,2}));
        p.add(new com.company.Path("F", new int[] {3,0,0,7,0}));

        a.initiateDjikstraProg(p,0);
        System.out.println("\n");
        p.clear();

        //Problem 5
        System.out.println("Problem 5");
        p.add(new com.company.Path("A",new int[] {0,4,2,0,0,0}));
        p.add(new com.company.Path("B",new int[] {0,0,5,10,0,0}));
        p.add(new com.company.Path("C",new int[] {0,0,0,0,3,0}));
        p.add(new com.company.Path("D",new int[] {0,0,0,0,0,11}));
        p.add(new com.company.Path("E",new int[] {0,0,0,4,8,0}));
        p.add(new com.company.Path("F",new int[] {0,0,0,0,0,0}));

        a.initiateDjikstraProg(p,0);
        System.out.println("\n");
        p.clear();

/** How to initiate Djikstra
 * 1. initialize the class for Algo and Path.
 * 	Algo algo = new Algo();
 *	ArrayList<Path> path = new ArrayList()<>;
 *
 * 2. Enter the value to path as follows :-
 * 	path.add(new Path([String VertexName],[int array of distance]));
 *
 * 3. Enter the value to algo as follows :-
 *	algo.initiateDjikstraProg(path,source);
 *
 *				!!!Important Notes!!!
 * To Enter the value of Path you need to imagine it as a table.
 * _______________________________
 * |Vertex|	A  |	B  | C  |  D  |
 * —------------------------------
 * |  A   |	0  |	3  | 4  |  0  |
 * —------------------------------
 * |  B   |	0  |	0  | 2  |  0  |
 * —------------------------------
 * |  C   |	0  |	0  | 0  |  0  |
 * —------------------------------
 * |  D   |	5  |	0  | 0  |  0  |
 * —------------------------------
 *
 *	The graph is illustrated as below
 *
 *	      5           3
 * 	D —-------> A —-------> B
 *			|		     |
 *		  4 |            | 2
 *			|		     |
 *    	    +--> C <-----+
 *
 * We can conclude that D is a starting point while C is the ending point
 * based on the picture above.
 *
 * So, enter the value as written :-
 * path.add(new Path("A",new int[] {0,3,4,0}));
 * path.add(new Path("B",new int[] {0,0,2,0}));
 * path.add(new Path("C",new int[] {0,0,0,0}));
 * path.add(new Path("D",new int[] {5,0,0,0}));
 *
 * a.initiateDjikstraProg(path,3); *Source is 3 as we picked “D” as our
 * 					    starting point(using path[index of 3)

 **/
    }
}

class Algo {
    private int numOfPoints;
    private com.company.Path temp;

    public void initiateDjikstraProg(ArrayList path,int source){
        numOfPoints = path.size();
        int[] distance = new int[numOfPoints];
        String[] status = new String[numOfPoints];

/********Part 1 (Initialization of each possible path and distance)**********/
        for (int i = 0; i < numOfPoints; i++) {
            /** Assume that all distance are infinity and NOT VISITED **/
            distance[i] = Integer.MAX_VALUE;
            status[i] = "Not Visited";
        }

        distance[source] = 0; /** Source Vertex will always be 0 as it is pointed to itself **/
        for (int i = 0; i < numOfPoints - 1; i++) {
            int index = 0;
            int min = Integer.MAX_VALUE;

/**************Part 2 (Finding the minimum value of the path)****************/
            for (int j = 0; j < numOfPoints; j++) {
                /** Find the minimum distance of a vertex and its index position will be used as a marker**/
                if(distance[j] <= min && status[j].equalsIgnoreCase("Not Visited")){
                    min = distance[j];
                    index = j;
                }
            }
            status[index] = "Visited";
            /** The index position of minimum distance will be marked as VISITED**/
            temp = (com.company.Path) path.get(index);
            /** Get the value of minimum distance input**/

/*************Part 3 (Comparing the distance for each vertex)***************/
            for (int v = 0; v < numOfPoints; v++) {
                /** Compare the distance that are (NOT VISITED) && (HAS A VALUE > 0 ) && (IS NOT AN INFINITY VALUE) && (The total minimum distance added by current value must be < current distance)**/
                /** When the current value of distance are lower than (minimum distance + current value of input), the current value of distance will be updated.**/
                /** For Example :
                 *
                 * [0]   2    [2]   3  [Infinity]
                 * (A) -----> (B) -----> (C)
                 *
                 * From distance A to B, we know that the value is 2 as B is the closest possible distance from A.
                 * But the total distance of C is INFINITY as it was currently assumed that the distance from A to C has been set to INFINITY.
                 *
                 * But, using the formula = (minimum distance + current value of input) < current value of distance, we can change the total value of C.
                 * (Current Value of B + Distance From B to C) COMPARED TO (Total Value of C)
                 * [ 2 + 3 < INFINITY]
                 * [5 < INFINITY]
                 *
                 * (5) is lower than infinity thus it is true.
                 * When the statement is true we can convert the total Distance of C to (minimum distance + current value of input)
                 *
                 * [0]   2    [2]   3    [5]
                 * (A) -----> (B) -----> (C)
                 * **/
                if (status[v].equalsIgnoreCase("Not Visited") && temp.getValue()[v] != 0 && distance[index] != Integer.MAX_VALUE && distance[index] + temp.getValue()[v] < distance[v]) {
                    distance[v] = distance[index] + temp.getValue()[v];
                }
            }
        }

        /** Print the Shortest Path from source and total number of Vertices**/
        System.out.println("Total Vertex is : " + path.size());
        for (int i = 0; i < numOfPoints; i++) {
            temp = (com.company.Path) path.get(i);
            com.company.Path startingPoint = (com.company.Path) path.get(source);
            System.out.println("Shortest Path From " + startingPoint.getPoints() + " to " + temp.getPoints() + " : " + distance[i]);
        }
    }
}

class Path {
    /** General Class of Path which contain Vertices Points and Edges Value**/
    private String points;
    private int[] value;

    public Path(){
        points = null;
        value = null;
    }
    public Path(String points, int[] value){
        this.points = points;
        this.value = value;
    }
    public void setValue(int[] value) {this.value = value;}
    public void setPoints(String points) {this.points = points;}
    public int[] getValue() {return value;}
    public String getPoints() {return points;}

}
/********End Of Programs***********/