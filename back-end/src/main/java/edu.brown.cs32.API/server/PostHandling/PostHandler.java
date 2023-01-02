package edu.brown.cs32.API.server.PostHandling;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs32.API.posts.CarPost;
import edu.brown.cs32.API.posts.PlanePost;
import edu.brown.cs32.API.posts.Post;
import edu.brown.cs32.API.posts.TrainPost;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handler class for post creating API endpoint.
 *
 * <p>This endpoint takes a post call to the API and creates a Post object corresponding to that
 * information. Also stores the post in the correct User's Posts DB.
 */
public class PostHandler implements Route {
  /** text objects to change here! */
  String textEmptyPostFields = "error_required_fields_left_empty";
  String textNoUser = "error_post_has_no_associated_user";
  String textInvalidDates = "error_invalid_date_format";

  /** Constructor accepts some shared state */
  public PostHandler() {}

  /**
   * converts a string of the form MM/dd/yyyy to a Date object
   *
   * @param stringDate -- the String form of the date (MM/dd/yyyy)
   * @return Date object corresponding to the Stirng given
   * @throws ParseException when String not in the correct form
   */
  public static Date convertStringtoDate(String stringDate) throws ParseException {
    // CITE: https://www.javatpoint.com/java-string-to-date
    if ((stringDate == null) || stringDate.equals("")) {
      return null;
    }
    return new SimpleDateFormat("MM/dd/yyyy").parse(stringDate);
  }

  /**
   * Pick a convenient soup and make it. the most "convenient" soup is the first recipe we find in
   * the unordered set of recipe cards.
   *
   * @param request the request to handle
   * @param response- use to modify properties of the response
   * @return response content
   * @throws Exception This is part of the interface; we don't have to throw anything.
   */
  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      // set up potential QueryParam values
      String userID;
      String postType;
      String text;
      String fromLocation;
      String toLocation;
      String startDate;
      String endDate;

      // get the existing QueryParam values
      QueryParamsMap qm = request.queryMap();
      userID = qm.value("userID");
      System.out.println("userID (PostHandler): " + userID);

      if (userID == null) {
        return new PostFailureResponse(textNoUser).serialize();
      }

      System.out.println("is check bypassed");

      postType = qm.value("type");
      text = qm.value("text");
      fromLocation = qm.value("fromLocation");
      toLocation = qm.value("toLocation");
      startDate = qm.value("startDate");
      endDate = qm.value("endDate");

      // create new post object
      Post newPost = null;
      if (postType != null && !postType.equals("CAR")) {
        if (postType.equals("PLANE")) {
          String toFlights =
              null; // flight lists originally gotten as strings from query params... then need to
          // be changed into ArrayList
          String returnFlights = null;

          toFlights = qm.value("toFlights"); // How to get this as an array from
          returnFlights = qm.value("returnFlights");

          // change toFlight and returnFlights to ArrayList<String>
          ArrayList<String> toFlightsArray = new ArrayList<>();
          ArrayList<String> returnFlightsArray = new ArrayList<>();

          if (toFlights != null) {
            toFlightsArray = new ArrayList<>(Arrays.asList(toFlights.split(",")));
          }
          if (returnFlights != null) {
            returnFlightsArray = new ArrayList<>(Arrays.asList(returnFlights.split(",")));
          }

          newPost =
              new PlanePost(
                  userID,
                  text,
                  fromLocation,
                  toLocation,
                  convertStringtoDate(startDate),
                  convertStringtoDate(endDate),
                  toFlightsArray,
                  returnFlightsArray);

          System.out.println("PLANE post created!");
        } else if (postType.equals("TRAIN")) {
          String linesToDest =
              null; // flight lists originally gotten as strings from query params... then need to
          // be changed into ArrayList
          String linesFromDest = null;
          linesToDest = qm.value("linesToDest"); // How to get this as an array from
          linesFromDest = qm.value("linesFromDest");

          // change toFlight and returnFlights to ArrayList<String>
          ArrayList<String> toLinesArray = new ArrayList<>();
          ArrayList<String> fromLinesArray = new ArrayList<>();
          if (linesToDest != null) {
            toLinesArray = new ArrayList<>(Arrays.asList(linesToDest.split(",")));
          }
          if (linesFromDest != null) {
            fromLinesArray = new ArrayList<>(Arrays.asList(linesFromDest.split(",")));
          }

          newPost =
              new TrainPost(
                  userID,
                  text,
                  fromLocation,
                  toLocation,
                  convertStringtoDate(startDate),
                  convertStringtoDate(endDate),
                  toLinesArray,
                  fromLinesArray);

          System.out.println("TRAIN post created!");
        }
      } else { // defaults to car type (b/c no extra fields required)
        newPost =
            new CarPost(
                userID,
                text,
                fromLocation,
                toLocation,
                convertStringtoDate(startDate),
                convertStringtoDate(endDate));
        System.out.println("CAR post created!");
      }

      Map<String, Object> responseMap = newPost.generateMap();
      responseMap.put("result", "success");
      return new PostSuccessResponse("success", responseMap).serialize();
    }
    catch (IOException e) {
      e.printStackTrace();
      return new PostFailureResponse(textEmptyPostFields).serialize();
    } catch (IllegalArgumentException e) {
      e.printStackTrace();
      return new PostFailureResponse(textInvalidDates).serialize();
    } catch (Exception e) {
      e.printStackTrace();
      return new PostFailureResponse(textNoUser).serialize();
    }
  }

  /**
   * creates output with appropriate error message in case of post failure
   *
   * @param result -- specific error message
   * @return hashmap with error as result (key)
   */
  public Map<String, String> createFailureMap(String result) {
    Map<String, String> responseMap = new HashMap<>();
    responseMap.put("result", result);
    return responseMap;
  }

  public record PostSuccessResponse(String response, Map<String, Object> post) {
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<PostSuccessResponse> adapter = moshi.adapter(PostSuccessResponse.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }

  /** Response object to send if someone requested soup before any recipes were loaded */
  public record PostFailureResponse(String response) {
    String serialize() {
      Moshi moshi = new Moshi.Builder().build();
      return moshi.adapter(PostHandler.PostFailureResponse.class).toJson(this);
    }
  }
}

// newpost?userID=molly_mchenry&&type=PLANE&&text=hi&&fromLocation=PVD&&toLocation=LAX&&startDate=01/01/2023&&endDate=01/20/2023&&toFlights=BA2490,BA2491A&&returnFlights=BA3991
