import { Request, Response, NextFunction } from "express";
import Hotels from "../models/Hotels";
import HttpError from "../models/httpError";

interface HotelFilter {
  type?: string;
  "location.city"?: { $regex: string; $options: string };
  "location.country"?: { $regex: string; $options: string };
  pricePerNight?: { $gte?: number; $lte?: number };
  featured?: boolean;
  rating?: { $gte?: number };
}

type SortOption = Record<string, 1 | -1>;

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      type,
      city,
      country,
      minPrice,
      maxPrice,
      featured,
      minRating,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Define the filter with a specific type (HotelFilter)
    const filter: HotelFilter = {};

    if (type) {
      filter.type = type as string;
    }
    if (city) {
      filter["location.city"] = { $regex: city as string, $options: "i" };
    }
    if (country) {
      filter["location.country"] = { $regex: country as string, $options: "i" };
    }
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    if (featured !== undefined) {
      filter.featured = featured === "true";
    }
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    let sortOption: SortOption = { createdAt: -1 };
    if (sort) {
      switch (sort) {
        case "price-asc":
          sortOption = { pricePerNight: 1 };
          break;
        case "price-desc":
          sortOption = { pricePerNight: -1 };
          break;
        case "rating-desc":
          sortOption = { rating: -1 };
          break;
        case "rating-asc":
          sortOption = { rating: 1 };
          break;
        case "name-asc":
          sortOption = { name: 1 };
          break;
        case "name-desc":
          sortOption = { name: -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const hotels = await Hotels.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const totalHotels = await Hotels.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: hotels,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalHotels / Number(limit)),
        totalHotels,
        hotelsPerPage: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return next(
      new HttpError("Failed to fetch hotels. Please try again later.", 500)
    );
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const hotel = await Hotels.findById(id);

    if (!hotel) {
      return next(new HttpError("Hotel not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return next(
      new HttpError("Failed to fetch hotel. Please try again later.", 500)
    );
  }
};

export const getFeaturedHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotels = await Hotels.find({ featured: true });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("Error fetching featured hotels:", error);
    return next(
      new HttpError(
        "Failed to fetch featured hotels. Please try again later.",
        500
      )
    );
  }
};

export const getHotelsByType = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { type } = req.params;
    const hotels = await Hotels.find({ type });

    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("Error fetching hotels by type:", error);
    return next(
      new HttpError(
        "Failed to fetch hotels by type. Please try again later.",
        500
      )
    );
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hotel = await Hotels.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    console.error("Error creating hotel:", error);
    return next(
      new HttpError("Failed to create hotel. Please check your input.", 400)
    );
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const hotel = await Hotels.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return next(new HttpError("Hotel not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });
  } catch (error) {
    console.error("Error updating hotel:", error);
    return next(
      new HttpError("Failed to update hotel. Please check your input.", 400)
    );
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const hotel = await Hotels.findByIdAndDelete(id);

    if (!hotel) {
      return next(new HttpError("Hotel not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return next(
      new HttpError("Failed to delete hotel. Please try again later.", 500)
    );
  }
};
